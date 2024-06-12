import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useHR = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: isHR = false, isPending: isHRLoading} = useQuery({
        queryKey: [user?.email,'isHr'],
        enabled: !!user?.email,
        queryFn: async ()=> {
            if(user?.email){
                const res = await axiosSecure.get(`/users/hr/${user.email}`);
            
            return res.data?.HR;
            }
        }
    })
    
    return {isHR, isHRLoading};
};

export default useHR;