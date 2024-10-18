import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaExclamationCircle, FaUser } from 'react-icons/fa';
import { useAuth } from '../../AuthContext'; // Import useAuth to manage login state
import './Login.css';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
 // Destructure login function
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // State for managing login error message
  const [loginError, setLoginError] = useState("");

  const onUserSignin = async (data) => {
    try {
      const { email, password } = data;

      // Make a POST request to the login endpoint
      const result = await axios.post("http://localhost:3001/login", { email, password });

      if (result.status === 200) {
        const user = result.data.user;
        login(user); // Call login to set isAuthenticated to true

        // Check user role and navigate accordingly
        if (user.role === 'admin') {
          navigate("/adminhome"); // Redirect admin to admin home page
        } else {
          navigate("/webhome"); // Redirect user to user home page
        }
      } else {
        console.log("Login failed:", result.data.error || "Unknown error");
      }
    } catch (err) {
      // Handle error and set error message if login fails
      if (err.response && err.response.status === 401) {
        setLoginError("Invalid email or password.");
      } else {
        console.error("Login error:", err.response?.data?.error || err.message);
        setLoginError("An unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="containers">
      <div className="signin-container">
        <div className="signin-leftmenu">
          <h2>Welcome Back</h2>
          <p>Please sign in to continue</p>
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
        <div className="signin-form-wrapper">
          <h2 className="text-center">
            <FaUser className="profile-icon" /> Sign In
          </h2>
          <form onSubmit={handleSubmit(onUserSignin)} className="signin-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email *"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="error-text">
                  <FaExclamationCircle /> {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password *"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="error-text">
                  <FaExclamationCircle /> {errors.password.message}
                </span>
              )}
            </div>

            {/* Display login error message */}
            {loginError && <div className="error-message">{loginError}</div>}

            <div className="forgot-password">
              <p onClick={() => navigate("/forgot-password")}>
                Forgotten Password?
              </p>
            </div>

            <button className="btn btn-primary btn-block mt-4" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
