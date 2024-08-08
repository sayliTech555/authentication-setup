import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [shouldSubmit, setShoulSubmit] = useState(false);
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State to hold error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formdata.email && formdata.password) {
      setShoulSubmit(true);
    } else {
      setError("Please fill out both email and password fields.");
    }
  };

  useEffect(() => {
    const submitForm = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/user/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formdata),
          }
        );

        const data = await response.json();

        if (response.ok) {
          login(data.token);
          navigate("/product");
        } else {
          setError(data.message || "Something went wrong. Please try again.");
        }
      } catch (error) {
        setError("Error submitting form: " + error.message);
      }
    };

    if (shouldSubmit) {
      submitForm();
      setShoulSubmit(false);
    }
  }, [shouldSubmit, navigate, login, formdata]);

  return (
    <div className="bg-gray-50 m-auto mt-20 rounded-xl p-4 sm:p-6 md:p-8 max-w-lg">
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Login Form
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-400">
            !
          </span>
        </h2>
      </div>
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            name="email"
            required
            value={formdata.email}
            className="w-full bg-gray-100 border-0 text-gray-500 p-2 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={formdata.password}
            onChange={handleChange}
            required
            className="w-full bg-gray-100 border-0 text-gray-500 p-2 rounded"
          />
          <button
            type="submit"
            className={`mt-8 w-full bg-gradient-to-r from-blue-400 to-blue-900 text-white p-2 rounded`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
