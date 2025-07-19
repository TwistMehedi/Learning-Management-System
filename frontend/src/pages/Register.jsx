import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useCreateUserMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
 
const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [createUser] = useCreateUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await createUser(data).unwrap();
      console.log(res);
      dispatch(setUser(res.user));
      toast.success(res.message);
      navigate("/check-mail")
     } catch (error) {
      console.error(error.response?.data?.message || "Registration failed");
      toast.error(error.data?.message || "Registration failed")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min length is 6" } })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Optional fields */}
          <div className="form-control">
            <label className="label">Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              className="input input-bordered w-full"
              {...register("phone")}
            />
          </div>

          <div className="form-control">
            <label className="label">Role</label>
            <select className="select select-bordered w-full" {...register("role")}>
              <option value="">Select role (optional)</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">Social Links</label>
            <input
              type="text"
              placeholder="Enter social profile link"
              className="input input-bordered w-full"
              {...register("socialLinks")}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          You have account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
             Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
