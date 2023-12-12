import { Route , Routes , BrowserRouter , Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
// import Price from "./pages/Pricing"
// import Prodcut from "./pages/Product"
// import HomePage from "./pages/Homepage"
// import PageNotFound from "./pages/PageNotFound"
// import AppLayout from "./pages/AppLayout";
// import ProtectedRoute from "./pages/ProtectedRoute";
// import Login from "./pages/Login";
const HomePage = lazy(()=>import('./pages/Homepage'));
const Price = lazy(()=>import('./pages/Pricing'));
const Prodcut = lazy(()=>import('./pages/Product'));
const PageNotFound = lazy(()=>import('./pages/PageNotFound'));
const AppLayout = lazy(()=>import('./pages/AppLayout'));
const ProtectedRoute = lazy(()=>import('./pages/ProtectedRoute'));
const Login = lazy(()=>import('./pages/Login'));

import CountryList from "./components/CountryList";
import SpinnerFullPage from "./components/SpinnerFullPage"
import CitiesList from "./components/cityList";
import City from "./components/City";
import  Form  from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContexts";
import {AuthenticationProvider} from "./contexts/UserContexts"
export default function App(){
    return( 
        <CitiesProvider>
<AuthenticationProvider>

    <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage/>}>
    <Routes>

        <Route path="/" element = {<HomePage/>}/>
        <Route path="Product" element = {<Prodcut/>}/>
        <Route path="Price" element = {<Price/>}/>
        <Route path="Login" element = {<Login/>}/>
        <Route path="*" element = {<PageNotFound/>}/>

        <Route path="app" element = {<ProtectedRoute>
        <AppLayout/>
 </ProtectedRoute>}>
            <Route index element ={<Navigate replace to={"cities"}/>}/>
            <Route path="cities"  element ={<CitiesList />}/>
            <Route path="countries" element ={<CountryList/>}/>
            <Route path="form" element = {<Form/>}/>
            <Route path="cities/:id" element = {<City/>}/>
            </Route> 
    </Routes>
        </Suspense>
    </BrowserRouter>
</AuthenticationProvider>
        </CitiesProvider>
    )
}