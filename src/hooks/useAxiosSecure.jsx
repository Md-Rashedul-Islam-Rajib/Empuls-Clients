import axios from "axios";


export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
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
(error)=> {
    const status = error.response.status;
    console.log('error status',status);
    if(status == 401 || status == 403){
      console.log('object')  
    }
    return Promise.reject(error);
}
)
    return axiosSecure;
};

export default useAxiosSecure;