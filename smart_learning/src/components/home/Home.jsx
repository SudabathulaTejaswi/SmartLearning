import React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // For custom CSS

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <section className="home-hero d-flex align-items-center justify-content-center text-center ">
        <div className="div-left">
        <div>
          <h1 className="display-4">Welcome to Our Website</h1>
          <p className="lead">Your gateway to amazing experiences and services.</p>
          <button className="btn btn-light btn-lg mt-3 shadow" onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>
        </div>
        <div className="div-right">
            <img src="src\assets\image1.png" alt="" />
        </div>
      </section>

      {/* Features Section */}
      <section className="container features my-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title">Effective Course Suggestion</h2>
                <p className="card-text">This feature provides details about what it offers to users.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title">Assesing your Skills</h2>
                <p className="card-text">This feature explains its benefits and functionality.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="card-title">Job Suggestion</h2>
                <p className="card-text">Highlighting how this feature can be beneficial to users.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="home-cta text-center py-5">
        <div className="container  ">
          <h2 className="display-5">Ready to Join Us?</h2>
          <p className="lead">Sign up today and start exploring all the features we have to offer.</p>
          <button className="btn btn-light btn-lg mt-3 shadow" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
