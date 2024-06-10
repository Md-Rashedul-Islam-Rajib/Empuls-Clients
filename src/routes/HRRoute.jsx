import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useHR from "../hooks/useHR";
import { Navigate } from "react-router-dom";


const HRRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const {isHR, isHRLoading} = useHR();

    if(loading || isHRLoading){
        return (
        <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-[#6f42c1]"></span>
        
        </div>
        )
    }
    
    
    
        if(user && isHR){
            return <div>
                {children}
            </div>;
        }
        return <Navigate to='/login' state={location?.pathname}></Navigate>
};

export default HRRoute;