import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]/;
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleClick = () => {
    navigate("/");
    alert("Login Successfull");
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
      const logInData = { email, password };
      localStorage.setItem("logInData", JSON.stringify(logInData));
      setSubmitted(true);
    }
  }
  if (submitted) {
    const localLoginData = JSON.parse(localStorage.getItem("signinData")) || [];
    const matchedUser = localLoginData.find(
      (user) => user.email === email && user.password === password
    );
    if (matchedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      return navigate("/home");
    } else {
      // Invalid credentials
      alert("Invalid credentials");
    }
  }
  return (
    <div className="border w-25 mt-5 m-auto p-3 ">
      <h2 className="text-primary text-center">Login</h2>
      <div className="mt-3">
        <label>Email :</label>
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
        <label>Password :</label>
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
        <button
          style={{
            marginLeft: "180px",
            paddingTop: "px",
            background: "none",
            border: "none",
          }}
          onClick={handleClick}
          cur
        >
          Register Here?
        </button>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
