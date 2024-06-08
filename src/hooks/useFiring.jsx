import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPublic } from "./useAxiosPublic";



const useFiring = () => {
    const queryClient = useQueryClient()
    return useMutation({
     mutationFn: async (id) => {
         
         const response = await axiosPublic.patch(`/users/${id}`)
         return response.data;
     }, 
     onSuccess: ()=>{
         queryClient.invalidateQueries({ queryKey: ['users'] }) // remove the cache data from the get api what automatically triggered refetch the get api
     }
    })
 };


export default useFiring;