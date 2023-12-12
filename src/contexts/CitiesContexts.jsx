import { createContext   , useEffect, useContext, useReducer, useCallback} from "react";
const CitiesContext = createContext();


function reducer(state , action){
    switch(action.type){
        case  "loading" : return {...state , isLoading :true}
        case "cities/loaded" :
        return{...state , cities : action.payload , isLoading : false}
        case "rejected": return{... state ,  error : action.payload}
        case "city/get" :return {...state , currentCity : action.payload , isLoading : false}
        case "city/created" : return {...state , cities : [...state.cities  , action.payload] , isLoading: false}
        case "city/deleted": return {...state , cities :state.cities.filter(city=>city.id !== action.payload) , isLoading : false}
            default: throw new Error("action not found");
    }
}
function CitiesProvider({children}){
const initalState = {
    cities : [],
    isLoading: false,
    currentCity : {},
    error : ""
}

const [{cities , isLoading , currentCity , error} , dispatch] = useReducer(reducer , initalState)
    // const [cities , setCities] = useState([]);
    // const [isLoading , setLoading] = useState(false);
    // const [currentCity , setCurrentCity] = useState({});
    const Base_Url = 'http://localhost:9000';
    useEffect(function(){
       async function fetchData(){
        try{
            dispatch({type:"loading"})
            const response = await fetch(`${Base_Url}/cities`);
            const data = await response.json();
            dispatch({type : "cities/loaded" , payload : data})
        }catch{
            dispatch({type : "rejected" , payload : "there was something went wrong with loading cities"})
        }
        }
        fetchData();
    },[])

    

const getCity = useCallback( async(id)=>{
    if(id === currentCity.id) return ;
        try{
            dispatch({type: "loading"})
            const response = await fetch(`${Base_Url}/cities/${id}`);
            const data = await response.json();
            dispatch({type:"city/get" , payload :data })
        
        }catch{
            dispatch({type : "rejected" , payload : "there was something went wrong with loading the city"})

        }
        
  },[currentCity.id])
  // sent new city to api

  async function createCity(newCity){
    try{
        dispatch({type : "loading"})
        const res = await fetch(`${Base_Url}/cities` , {
            method:"POST",
            body : JSON.stringify(newCity),
            headers : {"Content-Type" : "application/json"}
            
        });
        const data = await res.json();
        // update cities in ui
        dispatch({type : "city/created" , payload : data})
    }catch(err){
        throw new Error("something went wrong");
    }
}

// delete imtem from api
async function deleteCity(id){
    try{
        dispatch({type:"loading"});
         await fetch(`${Base_Url}/cities/${id}` , {
            method:"DELETE",
            
        });
        dispatch({type:"city/deleted" ,payload : id})
    }catch(err){
        throw new Error("something went wrong");
    }
}



    return <CitiesContext.Provider value = {{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity
    }}>
        {children}
    </CitiesContext.Provider>
}
function useCties(){
    const Context = useContext(CitiesContext);
    return Context;
}
export {CitiesProvider , useCties };