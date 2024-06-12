import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const {isAdmin, isAdminLoading} = useAdmin();

    if(loading || isAdminLoading){
        return (
        <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-[#6f42c1]"></span>
        
        </div>
        )
    }
    
    
    
        if(user && isAdmin){
            return <div>
                {children}
            </div>;
        }
        
        return <Navigate to='/login' state={location?.pathname}></Navigate>
};

export default AdminRoute;