import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import {otec} from '../otec.jpeg'

export function ProtectedRoute({children}){
    const {user, loading} = useAuth();
    if (loading) return <img src=""></img>
    if (!user) return <Navigate to={'/'}/>

    return <>{children}</>
}

//comprobar si el usuario existe