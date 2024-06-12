import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";


export const axiosSecure = axios.create({
    baseURL: 'https://assignment-12-server-gamma-sable.vercel.app'
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const {logOutUser} = useContext(AuthContext);
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, 
    function (error){
        return Promise.reject(error);
    });

axiosSecure.interceptors.response.use((response)=> {
    return response;
},
async (error)=> {
    const status = error.response.status;
    if(status == 401 || status == 403){
      await logOutUser();
      navigate('/login') 
    }
    return Promise.reject(error);
}
)
    return axiosSecure;
};

export default useAxiosSecure;