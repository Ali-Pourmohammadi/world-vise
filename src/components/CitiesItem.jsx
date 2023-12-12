/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Link} from "react-router-dom"
import styles from "./CityItem.module.css"
import { CitiesProvider,useCties } from "../contexts/CitiesContexts";
export default function CitiesItem({city}){
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
  const {cityName , country , date , note , emoji , id , position} = city;
  const {currentCity , deleteCity} = useCties();
  function handleDelete(e){
    e.preventDefault();
    deleteCity(id);
  }
    return <li>
      <Link className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active']:''}`}to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button onClick={handleDelete} className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
}