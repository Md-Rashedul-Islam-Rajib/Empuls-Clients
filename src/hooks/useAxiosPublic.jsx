import axios from "axios";
import { axiosSecure } from "./useAxiosSecure";


export const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosPublic = () => {
    
    return axiosPublic;
};

export default useAxiosPublic;