/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ type, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border-2 border-black outline-0 pr-12" // Add pr-12 class to allow space for the icon button
        type={showPassword ? "text" : "password"}
        placeholder={`${type} your password`}
      />
      <button
        onClick={togglePasswordVisibility}
        className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-black cursor-pointer focus:outline-none"
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
};

export default PasswordInput;
