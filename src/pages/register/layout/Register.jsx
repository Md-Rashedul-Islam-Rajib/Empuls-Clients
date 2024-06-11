import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoImagesOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { BsBank2 } from "react-icons/bs";
import { HiCurrencyBangladeshi } from "react-icons/hi";

const imageHostingApiKey = import.meta.env.VITE_IMAGE_HOSTING_APIKEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();

  const { createUser, logOutUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const [userinfo, setUserinfo] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const { email, password } = data;
    if (password.length < 6) {
      return setError("password must be 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      return setError("password must have at least one uppercase characters");
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return setError("password must contain at least one special character");
    }
    setError("");
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(imageHostingApi, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res?.data?.success) {
      const userinformation = {
        name: data.name,
        image: res.data.data.display_url,
        email: data.email,
        role: data.role,
        bank_account_no: data.bank_account_no,
        salary: data.salary,
        designation: data.designation,
        isVerified : false
      };
      createUser(email, password)
        .then((result) => {
          axiosPublic.post("/users", userinformation).then((res) => {
            if (res.data.insertedId) {
              console.log("data inserted");
              toast.success("Account created successfully");
              logOutUser();
              navigate("/login");
            }
          });
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="p-2 md:w-2/5 mx-auto border rounded-lg p-2">
      {/* <Helmet> 
            <title>Register | Realty House Company</title>
          </Helmet> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="input input-bordered flex items-center gap-2 mb-2 md:mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </label>
        {errors.name && (
          <span className="text-red-600 text-sm">Name is required</span>
        )}

        <label className="input input-bordered flex items-center gap-2 mb-2 md:mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && (
          <p className="text-red-600 text-sm">Email is required</p>
        )}

        <label className="input input-bordered flex items-center gap-2 mb-2 md:mb-4">
          <BsBank2 />
          <input
            type="number"
            className="grow"
            placeholder="Bank A/C no"
            {...register("bank_account_no", { required: true })}
          />
        </label>
        {errors.bank_account_no && (
          <span className="text-red-600 text-sm">Bank A/C no is required</span>
        )}

        <div className="flex gap-4">
          <div>
            <label className="input input-bordered flex items-center gap-2 mb-2 md:mb-4">
              <HiCurrencyBangladeshi />
              <input
                type="number"
                className="grow"
                placeholder="Salary"
                {...register("salary", { required: true })}
              />
            </label>
            {errors.salary && (
              <span className="text-red-600 text-sm">Salary is required</span>
            )}
          </div>

          <div className="flex-1">
            <select
              className="input input-bordered flex items-center gap-2 mb-2 md:mb-4 w-full"
              {...register("designation", { required: true })}
            >
              <option>Designation</option>
              <option value="sales-assistant">Sales Assistant</option>
              <option value="social-media-executive">
                Social Media executive
              </option>
              <option value="digital-marketer">Digital Marketer</option>
            </select>
            {errors.designation && (
              <span className="text-red-600 text-sm">
                Designation is required
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="input flex items-center mb-2 md:mb-4">
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full pr-2"
              />
            </label>
            {errors.image && (
              <span className="text-red-600 text-sm">
                Photo is required
              </span>
            )}
          </div>

          <div>
            <select
              className="input input-bordered flex items-center gap-2 mb-2 md:mb-4 w-full"
              {...register("role", { required: true })}
            >
              <option>Select a role</option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
            {errors.role && (
              <span className="text-red-600 text-sm">Role is required</span>
            )}
          </div>
        </div>

        <label className="input input-bordered flex items-center gap-2 mb-2 md:mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            className="grow"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <span
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </label>
        {errors.password && (
          <p className="text-red-600 text-sm">Password is required</p>
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button className="btn bg-[#6F42C1] text-white w-full">Register</button>
      </form>

      <div className={`flex justify-between text-[#6F42C1] font-semibold my-4`}>
        <p>Already have account?</p>
        <Link to="/login">
          <p>Login Here</p>
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
