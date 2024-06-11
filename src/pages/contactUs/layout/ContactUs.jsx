import { useForm } from "react-hook-form";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { axiosPublic } from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
   
      axiosPublic.post("/messages",data)
      .then((res)=> {
          if (res.data.insertedId){
            reset()
              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your message has been send",
                  showConfirmButton: false,
                  timer: 1500
                });
          }
      })
    };

  return (
    <div
      className="h-screen"
      style={{ backgroundImage: "url(/Contactus.jpg)" }}
    >
      <div className="text-white flex flex-col lg:flex-row size-full">
        <div className="flex flex-col gap-10 justify-center lg: ml-60">
          <h2 className="text-4xl font-bold">Contact Us</h2>

          <div>
            <div className="flex items-center gap-2 text-xl font-medium my-2">
              <span>
                <BsFillTelephoneFill />
              </span>{" "}
              Call Us{" "}
            </div>
            <p>1 (234) 567-891, 1 (234) 987 654</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xl font-medium my-2">
              <span>
                <IoLocationSharp />
              </span>{" "}
              Location
            </div>
            <p>121 Rock Street, 21 Avenue, New York, NY 92103</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xl font-medium my-2">
              <span>
                <IoMdTime />
              </span>{" "}
              Business Hours{" "}
            </div>
            <p>Mon-Fri.....10am-8pm, sat,sun.....closed</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 mb-4">
                <p>Email</p>
                <label className="input input-bordered flex items-center gap-2 ">
              <input
                type="text"
                className="grow"
                placeholder="Enter Your Email"
                {...register("email", { required: true })}
              />
            </label>
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm">Email is required</p>
            )}
            
              <div className="flex flex-col gap-3 mb-4">
                <p>Message</p>
                <textarea
                type="text"
                className="textarea text-black"
                placeholder="Enter Your Message"
                {...register("message", { required: true })}
              />
              </div>
            
            {errors.message && (
              <p className="text-red-600 text-sm">Message is required</p>
            )}
                <div>
                <button className="btn bg-[#6F42C1] text-white w-full border-0">Submit</button>
                </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
