import { Navigate } from "react-router-dom"

import Login from "./Pages/Login"

const ProtectRoute = ({children}) =>{


    const user = JSON.parse(localStorage.getItem('user'));

    if(!user || !user.token){
        return <Navigate to="/"/>
    }

    return children;
   
}


export default ProtectRoute;


// we are returning component 