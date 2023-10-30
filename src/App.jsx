import { Route , Routes , BrowserRouter } from "react-router-dom";
import Price from "./pages/Pricing"
import Prodcut from "./pages/Product"
import HomePage from "./pages/Homepage"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CountryList from "./components/CountryList";
import CitiesList from "./components/cityList";
import City from "./components/City"
import { useEffect, useState } from "react";
export default function App(){
    const [cities , setCities] = useState([]);
    const [isLoading , setLoading] = useState(false);
    const Base_Url = 'http://localhost:9000';
    useEffect(function(){
       async function fetchData(){
        try{
            setLoading(true);
            const response = await fetch(`${Base_Url}/cities`);
            const data = await response.json();
            setLoading(false);
            setCities(data);
        }catch{
            throw new Error("something went wrong !");
        }
        }
        fetchData();
    },[])
    return <BrowserRouter>
    <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="Product" element = {<Prodcut/>}/>
        <Route path="Price" element = {<Price/>}/>
        <Route path="Login" element = {<Login/>}/>
        <Route path="*" element = {<PageNotFound/>}/>
        <Route path="app" element = {<AppLayout/>}>
            <Route index element ={<CitiesList cities = {cities}  isLoading = {isLoading}/>}/>
            <Route path="cities"  element ={<CitiesList cities = {cities}  isLoading = {isLoading} />}/>
            <Route path="countries" element ={<CountryList isLoading ={isLoading} cities={cities}/>}/>
            <Route path="cities/:city" element = {<City/>}/>

            </Route> 
    </Routes>
    </BrowserRouter>
}