import React, { useContext, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { notify } from "../components/ToastProvider";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { navigate, backendUrl, token, setToken } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
          confirmPassword,
        });

        if (response.data.success) {
          const userName = response.data.user.name;
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userName", userName);
          notify.success(`${userName}, ${response.data.message}`);
          localStorage.setItem("token", response.data.token);
          // navigate("/");
        } else {
          notify.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (response.data.success) {
          const userName = response.data.user.name;
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userName", userName);
          notify.success(`${userName}, ${response.data.message}`);
          localStorage.setItem("token", response.data.token);
          // navigate("/");
        } else {
          notify.error(response.data.message);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  // const handleForgotPassword = () => {
  //   alert("Redirect to Forgot Password page");
  // };

  const validatePassword = (event) => {
    const password = event.target.form.password.value;
    const confirmPassword = event.target.value;
    if (password !== confirmPassword) {
      event.target.setCustomValidity("Passwords do not match");
    } else {
      event.target.setCustomValidity("");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 "
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prate-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          name="name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        name="email"
        required
      />

      <div className="relative w-full">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={showPassword ? "text" : "password"}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          name="password"
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 cursor-pointer"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>

      {currentState !== "Login" && (
        <div className="relative w-full">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type={showConfirmPassword ? "text" : "password"}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            onInput={validatePassword}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2.5 cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
      )}

      <div className="w-full flex justify-between text-sm -mt-2">
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create an account?
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
        {currentState === "Login" && (
          <p
            // onClick={handleForgotPassword}
            className="cursor-pointer text-blue-600"
          >
            Forgot your password?
          </p>
        )}
      </div>

      <button className="bg-primary hover:bg-primary-dull text-white font-light px-8 py-2 mt-4 cursor-pointer rounded-full">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
