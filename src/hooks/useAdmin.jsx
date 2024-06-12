import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !!user?.email,
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        
        return res.data?.admin;
      }
    },
  });
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
