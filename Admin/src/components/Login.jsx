import React, { useState } from "react";
import Title from "./Title";
import axios from "axios";
import { backendUrl } from "../App";
import { notify } from "../components/ToastProvider";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        notify.success(response.data.message);
      } else {
        notify.error(response.data.message);
      }
      // console.log(email, password);
      // console.log(response);
    } catch (error) {
      console.log(error);
      notify.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full border-primary">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md border-1 border-primary ">
        <Title text1={"Admin"} text2={"Panel"} />
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-200 outline-none focus:border-borderColor transition placeholder-gray-400"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-200 outline-none focus:border-borderColor transition placeholder-gray-400 "
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull mt-2 w-full py-2 px-4 rounded-md text-white cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
