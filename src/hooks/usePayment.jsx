
import Swal from 'sweetalert2';
import { axiosPublic } from './useAxiosPublic';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePayment = (data) => {
    const queryClient = useQueryClient()
    return useMutation({
     mutationFn: async (id) => {
         console.log(id,data);
         const response = await axiosPublic.post(`/payment-history/${id}`,{data})

         return response.data;
     }, 
     onSuccess: ()=>{
         queryClient.invalidateQueries({ queryKey: ["payment-history",'payment-barchart'] });
         Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment has been successful",
            showConfirmButton: false,
            timer: 1500
          });
     },
     onError: (error)=> {
        console.log(error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Payment failed",
            showConfirmButton: false,
            timer: 1500
          });
     }
    })
};

export default usePayment;