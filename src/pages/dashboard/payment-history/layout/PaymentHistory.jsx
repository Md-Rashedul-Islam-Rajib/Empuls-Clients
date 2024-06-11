import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { axiosPublic } from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../context/AuthProvider";
const PaymentHistory = () => {
  const { user } = useContext(AuthContext);

  const { data: paymentinformation = [] } = useQuery({
    queryKey: ["payment-history"],
    enabled: !!user.email,
    queryFn: async () => {
      const res = await axiosPublic.get("/payment-history", {
        params: { email: user?.email },
      });
      return res.data;
    },
  });

  return (
    <div>
      {paymentinformation?.length=== 0? <div className=" flex justify-center mt-10">
              <h2 className="text-3xl font-semibold"> You have no payment history</h2>
              </div>:<div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Month</th>
              <th>Amount</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {paymentinformation?.map((item, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{item?.month ? item?.month : "N/A"}</td>
                <td>{item?.salary ? item?.salary : "N/A"}</td>
                <td>{item?.TRID ? item?.TRID : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
};

export default PaymentHistory;
