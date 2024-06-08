import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../context/AuthProvider";

const useGetWorkData = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: workdata = [], refetch } = useQuery({
    enabled: !!user && !loading,
    queryKey: ["workdata"],
    queryFn: async () => {
      const response = await axiosPublic.get("/work-list", {
        params: { email: user?.email },
      });

      return response.data;
    },
  });
  return {workdata,refetch};
};

export default useGetWorkData;
