import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useEmployee from "../hooks/useEmployee";
import { Navigate } from "react-router-dom";


const EmployeeRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const {isEmployee, isEmployeeLoading} = useEmployee();

    if(loading || isEmployeeLoading){
        return (
        <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-[#6f42c1]"></span>
        
        </div>
        )
    }
    
    
    
        if(user && isEmployee){
            return <div>
                {children}
            </div>;
        }
        return <Navigate to='/login' state={location?.pathname}></Navigate>

};

export default EmployeeRoute;