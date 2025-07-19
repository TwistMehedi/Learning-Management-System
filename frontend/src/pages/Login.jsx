import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/v1/auth/login", data, {
        withCredentials: true,
      });
      console.log(res.data.message); // or toast notification
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
            )}
          </div>

          <button className="btn btn-primary w-full mt-4">Login</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
