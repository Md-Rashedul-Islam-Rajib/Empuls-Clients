import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPublic } from "./useAxiosPublic";
import Swal from "sweetalert2";


const useIncreaseSalary = (data) => {
    const queryClient = useQueryClient()
    return useMutation({
     mutationFn: async (id) => {
         
         const response = await axiosPublic.patch(`/users/${id}/salary`,{data})
         return response.data;
     }, 
     onSuccess: ()=>{
         queryClient.invalidateQueries({ queryKey: ['all-employee-list'] }) ;
         Swal.fire({
            position: "center",
            icon: "success",
            title: "Salary increased successfully",
            showConfirmButton: false,
            timer: 1500
          });
     },
     onError: (error)=> {
        console.log(error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Salary increment failed",
            showConfirmButton: false,
            timer: 1500
          });
     }
    })
};

export default useIncreaseSalary;