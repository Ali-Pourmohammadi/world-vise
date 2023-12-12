import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "../contexts/UserContexts";
import { useEffect } from "react";

export default function ProtectedRoute({children}){
    const {isAuthenticated}= useAuthenticated();
    const navigate = useNavigate();
    useEffect(function(){
        if(!isAuthenticated) navigate("/");
    } , [ isAuthenticated , navigate]);
    return isAuthenticated?children:null;
    }