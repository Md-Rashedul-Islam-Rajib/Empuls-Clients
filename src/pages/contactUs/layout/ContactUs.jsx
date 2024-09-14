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
    axiosPublic.post("/messages", data).then((res) => {
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your message has been sent",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  return (
    <div
      className="py-20"
      style={{ backgroundImage: "url(/Contactus.jpg)" }}
    >
      <div className="text-white flex flex-col lg:flex-row size-full px-4 lg:px-20 gap-10">
        {/* Contact Info Section */}
        <div className="flex flex-col justify-center text-center lg:text-start">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>

          <div className="mb-4">
            <div className="flex items-center gap-2 text-xl font-medium mb-1 justify-center lg:justify-start">
              <span>
                <BsFillTelephoneFill />
              </span>{" "}
              Call Us
            </div>
            <p className="text-sm lg:text-base">1 (234) 567-891, 1 (234) 987 654</p>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 text-xl font-medium mb-1 justify-center lg:justify-start">
              <span>
                <IoLocationSharp />
              </span>{" "}
              Location
            </div>
            <p className="text-sm lg:text-base">
              121 Rock Street, 21 Avenue, New York, NY 92103
            </p>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 text-xl font-medium mb-1 justify-center lg:justify-start">
              <span>
                <IoMdTime />
              </span>{" "}
              Business Hours
            </div>
            <p className="text-sm lg:text-base">
              Mon-Fri: 10am-8pm, Sat-Sun: Closed
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="flex-1 flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex flex-col gap-4 mb-4">
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                className="input input-bordered w-full p-2 rounded-md"
                placeholder="Enter Your Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">Email is required</p>
              )}
            </div>

            <div className="flex flex-col gap-4 mb-4">
              <label className="text-gray-700">Message</label>
              <textarea
                className="textarea textarea-bordered w-full p-2 rounded-md"
                placeholder="Enter Your Message"
                {...register("message", { required: true })}
              />
              {errors.message && (
                <p className="text-red-600 text-sm">Message is required</p>
              )}
            </div>

            <button className="btn bg-[#6F42C1] text-white w-full border-0 py-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
