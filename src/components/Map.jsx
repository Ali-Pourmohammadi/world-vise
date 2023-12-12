/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { urlPosition } from "../hooks/UseMapPostion";
import styles from "./Map.module.css"
import { MapContainer , Marker , TileLayer , Popup, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCties } from "../contexts/CitiesContexts";
import { useGeolocation } from "../hooks/geoLocation";
import Button from "./Button";

export default function Map(){
  const {isLoading : positionLoading ,position ,getPosition } = useGeolocation();
  // const {currentCity} = useCties();
const [mapLat , mapLng] =  urlPosition()
    const [mapPosition , setMapPosition] = useState([40 , 0]);
    const {cities}= useCties();
    useEffect(function(){
      if(mapLat,mapLng) 
      setMapPosition([mapLat,mapLng]);
    },[mapLat,mapLng]);
    useEffect(function(){
      if(position) setMapPosition([position.lat , position.lng])
    },[position])
    return <div className={styles.mapContainer}>
        {!position && <Button type={"position"} onclick={getPosition}>{`${positionLoading ? "loading your position..." : "search your position"}`}</Button>}
<MapContainer className={styles.map} center={mapPosition} zoom={7} scrollWheelZoom={true} >
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"/>
     {cities.map((city)=><Marker key={city.id} position={[city.position.lat,city.position.lng] }>
     <ClickMap/>

    <Popup>
        <span>{city.emoji}</span>
        <span>{city.cityName}</span>

    </Popup>
    <ChangeCenter position = {mapPosition}/>
  </Marker>)}
</MapContainer>

    </div>
}
function ChangeCenter({position}){
  const map = useMap();
  map.setView(position);
  return null;
}
function ClickMap(){
  const navigate = useNavigate();

  useMapEvents({
    click:(e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null
}