import "./Signup.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import Select from "react-select";
import axios from "axios";
import { useState,useEffect } from "react";

function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const [emailError, setEmailError] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillLevel, setSkillLevel] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skills, setSkills] = useState([]);

  // Function to fetch skills and convert to the required format
  const fetchSkills = async () => {
    try {
      const response = await axios.get('http://localhost:3001/skills'); // Fetch skills
      // Convert the response to the format: { value: "skill_name", label: "skill_name" }
      const formattedSkills = response.data.map(skil => ({
        value: skil.skill,  // Assuming 'name' is the field for the skill name
        label: skil.skill   // Set both value and label as the skill name
      }));
      setSkills(formattedSkills); // Store skills in the state
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  // Fetch skills on component mount
  useEffect(() => {
    fetchSkills();
  }, []);


  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);
        console.log(imageFile);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Add a skill to the selected skills list
  const handleAddSkill = () => {
    if (selectedSkill && skillLevel) {
      const skillData = {
        skill: selectedSkill.value,
        level: skillLevel,
      };
      setSelectedSkills([...selectedSkills, skillData]);
      setSelectedSkill(null);
      setSkillLevel("");
    }
  };

  // Remove a skill from the selected skills list
  const handleRemoveSkill = (index) => {
    const updatedSkills = selectedSkills.filter((_, i) => i !== index);
    setSelectedSkills(updatedSkills);
  };

  // Submit the signup form
  const onUserRegister = (data) => {
    data.skills = selectedSkills;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email.toLowerCase());
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("study", data.study);
    formData.append("college", data.college);
    formData.append("skills", JSON.stringify(data.skills)); // Send skills as JSON
    formData.append("gender", data.gender);
    if (imageFile) formData.append("profileImage", imageFile); // Attach the image file
    console.log(formData);

    axios
      .post("http://localhost:3001/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result.status === 201) {
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setEmailError("Email already exists.");
        } else {
          console.error(err);
        }
      });
  };

  return (
    <div className="containers">
      <div className="signup-container">
        <div className="signup-leftmenu">
          <h2>Welcome</h2>
          <p>You are 30 seconds away from upgrading your Skills!</p>
          <button className="login-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>

        <div className="signup-form-wrapper">
          <h2 className="text-center">Sign Up</h2>

          <div className="image-preview">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="preview-image"
              />
            ) : (
              <div className="placeholder-image">Profile Image</div>
            )}
          </div>

          <form onSubmit={handleSubmit(onUserRegister)} className="signup-form">
            {/* Profile Image */}
            <div className="form-group">
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control"
              />
            </div>

            {/* Name */}
            <div className="form-group">
              <input
                name="name"
                type="text"
                placeholder="Name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <FaExclamationCircle className="error-icon" />}
            </div>

            {/* Study */}
            <div className="form-group">
              <input
                name="study"
                type="text"
                placeholder="*Eg: Btech-3 year - CSE"
                className={`form-control ${errors.study ? "is-invalid" : ""}`}
                {...register("study", { required: "Study is required" })}
              />
              {errors.study && <FaExclamationCircle className="error-icon" />}
            </div>

            {/* College */}
            <div className="form-group">
              <input
                name="college"
                type="text"
                placeholder="Your College"
                className={`form-control ${errors.college ? "is-invalid" : ""}`}
                {...register("college", { required: "College is required" })}
              />
              {errors.college && <FaExclamationCircle className="error-icon" />}
            </div>

            {/* Phone */}
            <div className="form-group">
              <input
                name="phone"
                type="text"
                placeholder="Your Phone *"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phone && <FaExclamationCircle className="error-icon" />}
            </div>

            {/* Email */}
            <div className="form-group">
              <input
                name="email"
                type="email"
                placeholder="Your Email *"
                className={`form-control ${errors.email || emailError ? "is-invalid" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <FaExclamationCircle className="error-icon" />}
              {emailError && <div className="error-message">{emailError}</div>}
            </div>

            {/* Password */}
            <div className="form-group">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character",
                  },
                })}
              />
              {errors.password && (
                <div className="error-message">
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <input
                name="confirmpassword"
                type="password"
                placeholder="Confirm Password"
                className={`form-control ${errors.confirmpassword ? "is-invalid" : ""}`}
                {...register("confirmpassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              {errors.confirmpassword && (
                <div className="error-message">
                  <span>{errors.confirmpassword.message}</span>
                </div>
              )}
            </div>

            {/* Skill Selection */}
            <div className="form-group">
              <div className="skill-input-container">
                <Select
                  value={selectedSkill}
                  onChange={setSelectedSkill}
                  options={skills}
                  placeholder="Search and select a skill"
                  className="select-skill"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      padding: "5.5px",
                      border: "0px solid #007bff",
                      borderRadius: "5px", // Rounded corners
          boxShadow: state.isFocused ? "0 0 0 1px #0056b3" : "none", // Outline when focused
          "&:hover": {
            borderColor: "#0056b3", // Darker blue border on hover
          },
        }),
      }}
    />
  </div>
  </div>
  <div className="form-group">
    <div className="skill-level-and-button">
      <select
        value={skillLevel}
        onChange={(e) => setSkillLevel(e.target.value)}
        className="select-level"
      >
        <option value="">Select Level</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <button
        type="button"
        onClick={handleAddSkill}
        className="ok-btn-small"
      >
        OK
      </button>
    </div>
  </div>
  

            {/* Remove Skill Option */}
            <div className="btn-block2">
              {selectedSkills.length > 0 && (
                <ul className="selected-skills-list">
                  {selectedSkills.map((skill, index) => (
                    <li key={index}>
                      {skill.skill} - {skill.level}{" "}
                      <button
                        type="button"
                        className="remove-skill-btn"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button className="btn btn-primary btn-block mt-4" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;



