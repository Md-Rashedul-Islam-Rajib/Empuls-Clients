import { useQuery } from '@tanstack/react-query';
import { axiosPublic } from '../../../../hooks/useAxiosPublic';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {


const {email} = useParams();
console.log(email)


    const {  data : userInfo = [] } = useQuery({
        queryKey: ['employee-details'],
        queryFn: async () => {
          const response = await axiosPublic.get('/users',{
            params : { email : email}
          });
        return response.data;
        }
      })
      const {data : paymentinformation = [] } = useQuery({
        queryKey:['payment-barchart'],
        queryFn: async () => {
            const res = await axiosPublic.get('/payment-history',{
                params: {email: email}
            });
            return res.data;
        }
      }) 

      const barchartData = paymentinformation.map((payment) => ({
        month: `${payment.month} ${payment.year}`,
        salary: payment.salary
    }));

    return (
        <div>
            <div>
                <div className='flex justify-center'>
                <img className='max-w-64' src={userInfo?.image} alt="" />
                </div>
            <h2 className='text-2xl font-semibold text-center my-2'>{userInfo?.name}</h2>
            <h2 className='text-2xl text-center'>{userInfo?.designation}</h2>
            </div>

            <div style={{ width: '100%', height: 300 }} className='overflow-x-auto'>

            <ResponsiveContainer>
        <BarChart width={150} height={40} data={barchartData}>
        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
          <Bar dataKey="salary" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
            </div>


        </div>
    );
};

export default EmployeeDetails;