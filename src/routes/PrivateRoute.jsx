import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import spinner from '../assets/loading.gif'


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    
    
    if(loading){
        return (
        <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-[#6f42c1]"></span>
            {/* <img src={spinner} alt="" /> */}
        </div>
        )
    }
    
    
    
        if(user){
            return <div>
                {children}
            </div>;
        }
        return <Navigate to='/login' state={location?.pathname}></Navigate>
    };

export default PrivateRoute;