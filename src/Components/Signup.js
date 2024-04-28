import { useState } from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]/;
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  function handleSubmit() {
    if (email.trim() === "") {
      setErrors((errors) => ({ ...errors, email: "Enter Email Address" }));
    } else if (!emailpattern.test(email)) {
      setErrors((errors) => ({
        ...errors,
        email: "Enter Valid Email Address",
      }));
    } else {
      setErrors((errors) => ({ ...errors, email: "" }));
    }

    if (password.trim() === "") {
      setErrors((errors) => ({ ...errors, password: "Enter Password" }));
    } else {
      setErrors((errors) => ({ ...errors, password: "" }));
      const existingData = JSON.parse(localStorage.getItem("signinData")) || [];
      const newEntry = { fname, lname, email, password };
      const updatedData = [...existingData, newEntry];
      localStorage.setItem("signinData", JSON.stringify(updatedData));
      alert("Register Successfull");
      setSubmitted(true);
    }
  }
  if (submitted) {
    return (
      <div className="text-center mt-5 container">
        <Login />
      </div>
    );
  }
  return (
    <div className="d-flex justify-content-center allign-items-center container">
      <div className="border w-25 m-auto p-3">
        <h2 className="text-primary text-center">Sign Up</h2>
        <div className="mt-3">
          <label>First Name:</label>
          <input
            type="text"
            className="form-control"
            value={fname}
            onChange={(e) => {
              setFname(e.target.value);
            }}
          />
          <label>Last Name:</label>
          <input
            type="text"
            className="form-control"
            value={lname}
            onChange={(e) => {
              setLname(e.target.value);
            }}
          />
        </div>
        <div className="mt-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div className="mt-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
        </div>
        <div className="mt-3">
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
        <div className="mt-3">
          <button className="btn btn-primary w-100" onClick={handleClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
