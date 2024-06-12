import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPublic } from "./useAxiosPublic";


const useMakeHR = () => {
    const queryClient = useQueryClient()
   return useMutation({
    mutationFn: async (id) => {
        
        const response = await axiosPublic.patch(`/users/${id}/HR`,{status: 'HR'})
        return response.data;
    }, 
    onSuccess: ()=>{
        queryClient.invalidateQueries({ queryKey: ['users'] }) 
    }
   })
};


export default useMakeHR;