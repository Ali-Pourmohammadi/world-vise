import CountryItem from './CountryItem'
import styles from "./CountryList.module.css"
import Spinner from "./Spinner"
export default function CountryList({isLoading , cities}){
    const contries = cities.reduce((arr , curr)=>{
        if(arr.map((obj)=>obj.country).includes(curr.country)){
            return arr;
        }else{
            return [...arr  , {country :curr.country , emoji : curr.emoji}]
        }
    },[]);

    if(!contries.length)return
    if(isLoading) return <Spinner/>
    return  <ul className={styles.countryList}>
        {contries.map(country=><CountryItem country = {country}/>)}
    </ul>

}