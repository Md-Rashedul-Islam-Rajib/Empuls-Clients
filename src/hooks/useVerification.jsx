import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPublic } from "./useAxiosPublic";


const useVerification = () => {
    const queryClient = useQueryClient()
   return useMutation({
    mutationFn: async (id) => {
        
        const response = await axiosPublic.put(`/users/${id}`)
        return response.data;
    }, 
    onSuccess: ()=>{
        queryClient.invalidateQueries({ queryKey: ["employee-list"] }) 
    }
   })
};

export default useVerification;