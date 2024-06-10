import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {
const {user} = useContext(AuthContext);
const axiosSecure = useAxiosPublic();
const {data: isAdmin} = useQuery({
    queryKey: [user?.email,'isAdmin'],
    queryFn: async ()=> {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        console.log(res.data);
        return res.data?.admin;
    }
})
return [isAdmin];
    
};

export default useAdmin;