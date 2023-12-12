/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import { useNavigate ,useSearchParams } from "react-router-dom";
import {urlPosition} from "../hooks/UseMapPostion"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "./Spinner"
import Message from  "./Message"
import BackButton from "./BackButton"
import { useCties } from "../contexts/CitiesContexts";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
function reducer(state , action){
  switch(action.type){

    case "loadingData": return{...state  , isLoadingData:true , status :"loading"};
    case "recivedData": const {city , countryName , locality , countryCode} = action.payload;
       return {...state , isLoadingData : false , status : "data recived" , country : countryName , cityName : city || locality||  ""  , emoji:convertToEmoji(countryCode)};
       case "update_notes" : return {...state , status : "updating notes ..." , notes : action.payload}
       case "update_date" : return {...state ,  status : "updating date ...", date : action.payload}
       case"update_cityName" :return {...state   , cityName: action.payload};
       case "disabledIsLoading":return {...state , isLoadingData : false}
    default: throw new Error("action not found");
  }
}

function Form() {
  const initalState = {

    status : "",
    cityName : "",
    country : "",
    date : new Date(),
    notes: "",
    isLoadingData : false,
    emoji:""
  }
const [errorMessage , setErrorMessage] = useState("");
const [lat , lng] = urlPosition();
const {createCity , isLoading} = useCties();
const navigate = useNavigate();
const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
const [{cityName  , date , notes , isLoadingData , emoji , country,} , dispatch] = useReducer(reducer , initalState);
useEffect(function (){
  async function fetchCity(){
    try{
      
      dispatch({type : "loadingData"})
      const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
      const data = await res.json();
      setErrorMessage("");
      if(!data.countryCode) throw new Error("please click somewhere else ")
      dispatch({type:"recivedData" , payload : data});
    }catch(err){
      setErrorMessage(err.message)
    }finally{
      dispatch({type:'disabledIsLoading'})
    }
  }
  fetchCity()
},[lat , lng])
 async function handleSubmit(e){
  e.preventDefault();
  if(!cityName && !country) return;
  const newCity = {
    cityName,
    country,
    notes,
    emoji,
    date,
    position:{lat , lng}
  }
await  createCity(newCity);
navigate("/app");
}


if(isLoadingData) return <Spinner/>
if(errorMessage) return <Message message={errorMessage}/>
if(!lat && !lng) return <Message message={"to start click somewhere"}/>


  return (
    <>
    <form onSubmit={handleSubmit} className={`${styles.form} ${isLoading ? `${styles.loading}`: ""}`} >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={() => dispatch({type:"update_cityName",payload:cityName})}
          value={cityName}
          
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" onChange={(date)=>dispatch({type:"update_date", payload:date})}
        dateFormat= "dd/MM/yyyy"
        selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => dispatch({type : "update_notes",payload:e.target.value})}
          value={notes}
          />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}> Add </Button>
        <BackButton/>

      </div>
    </form>

          </>
    
  );
}

export default Form;
