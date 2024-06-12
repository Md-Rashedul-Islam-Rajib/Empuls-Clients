import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useEmployee = () => {
  const { user} = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isEmployee, isPending: isEmployeeLoading } = useQuery({
    queryKey: [user?.email, "isEmployee"],
    enabled: !!user?.email,
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/employee/${user?.email}`);
        console.log(res.data);
        return res.data?.employee;
      }
    },
  });
  return { isEmployee, isEmployeeLoading };
};

export default useEmployee;
