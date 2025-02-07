import React, { useState } from "react";
import axios from "axios"; // Import Axios
import theme from "../theme";
import { useNavigate, Link } from "react-router-dom";

interface LoginProps {
  setUsername: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ setUsername }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");
  const [password, setPassword] = useState<string>(""); // Add state for password
  const [error, setError] = useState<string>(""); // Add state for error handling

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = inputValue.trim();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      // Call the API to validate the user
      const response = await axios.get(
        `http://localhost:52944/api/Registration/ValidateUser/${username}/${password}`
      );

      if (response.data && response.data.Type) {
        const userType = response.data.Type.toLowerCase();

        const userName = response.data.username.toLowerCase(); // Get user type (customer, outlet, admin)

        // Set the username globally if required
        setUsername(userName);

        // Navigate to the appropriate dashboard based on user type
        switch (userType) {
          case "customer":
            navigate("/home", { state: { userName } });
            break;
          case "outlet":
            navigate("/outlet-dashboard", { state: { userName } });
            break;
          case "admin":
            navigate("/admin/dashboard", { state: { userName } });
            break;
          default:
            setError("Invalid user type.");
            break;
        }
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div
        className="card p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: theme.colors.cardBg,
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: theme.colors.textColor }}
        >
          Sign In
        </h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="form-label"
              style={{ color: theme.colors.textColor }}
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                backgroundColor: theme.colors.inputBg,
                border: "none",
                color: "#fff",
              }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: theme.colors.textColor }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                backgroundColor: theme.colors.inputBg,
                border: "none",
                color: "#fff",
              }}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <input
                type="checkbox"
                id="rememberMe"
                className="form-check-input"
              />
              <label
                htmlFor="rememberMe"
                className="form-check-label ms-2"
                style={{ color: theme.colors.textColor }}
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              style={{
                color: theme.colors.textColor,
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: theme.colors.buttonBg,
              color: "#fff",
            }}
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <span style={{ color: theme.colors.textColor }}>
            Don’t have an account?
          </span>
          <div className="mt-2">
            <Link
              to="/register-individual"
              style={{
                color: theme.colors.linkColor,
                textDecoration: "none",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              Register as Individual
            </Link>
            OR
            <Link
              to="/register-outlet"
              style={{
                color: theme.colors.linkColor,
                textDecoration: "none",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              Register as Outlet/Organization
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
