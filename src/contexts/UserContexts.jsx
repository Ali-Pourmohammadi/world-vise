import { createContext, useContext, useReducer } from "react";

const userAuthentication = createContext();
function reducer(state , action){
    switch(action.type){
    case "user/login": return{...state , user : action.payload , isAuthenticated : true}
    case "user/logout": return{...state , user : null , isAuthenticated:false}
    }
}
function AuthenticationProvider({children}){
const initialState = {
user : null ,
isAuthenticated : false
}
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
  
const [{user,isAuthenticated } , dispatch]  = useReducer(reducer , initialState);
function login(email , passwrod){
    if(email=== FAKE_USER.email && passwrod === FAKE_USER.password)
    dispatch({type:"user/login" , payload: FAKE_USER})
}

function logOut(){
    dispatch({type: "user/logout"})
}

    return <userAuthentication.Provider value={{user , isAuthenticated , login , logOut}}>
        {children}
    </userAuthentication.Provider>
}
function useAuthenticated(){
    const context = useContext(userAuthentication);
    if(context === undefined) throw new Error('context is used outside provider');
    return context;
}
export{AuthenticationProvider , useAuthenticated}