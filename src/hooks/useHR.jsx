import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useHR = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: isHR, isPending: isHRLoaing} = useQuery({
        queryKey: [user?.email,'isHr'],
        queryFn: async ()=> {
            const res = await axiosSecure.get(`/users/hr/${user.email}`);
            console.log(res.data);
            return res.data?.HR;
        }
    })
    return {isHR, isHRLoaing};
};

export default useHR;