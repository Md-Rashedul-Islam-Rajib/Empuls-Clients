import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useHR = () => {
    const {user,loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: isHR = false, isPending: isHRLoaing} = useQuery({
        queryKey: [user?.email,'isHr'],
        enabled: !loading,
        queryFn: async ()=> {
            if(user?.email){
                const res = await axiosSecure.get(`/users/hr/${user.email}`);
            console.log(res.data);
            return res.data?.HR;
            }
        }
    })
    console.log(isHR,isHRLoaing)
    return {isHR, isHRLoaing};
};

export default useHR;