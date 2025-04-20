

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated, setAdminProperties }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    const validUsername = "ikramgouskar";
    const validPassword = "2005";
    
    // Validate credentials
    if (credentials.username === validUsername && credentials.password === validPassword) {
      // Store authentication token in localStorage
      localStorage.setItem("token", "authenticated");
      localStorage.setItem('userlogin', validUsername);
      setIsAuthenticated(true); // Update authentication state
      setJustLoggedIn(true); // Set just logged in state
      navigate("/"); // Redirect to the home page
    } else {
      setError("Invalid username or password");
    }
  };

  useEffect(() => {
    if (justLoggedIn && localStorage.getItem("token") === "authenticated") {
      // Fetch or update admin properties here
      // Example: setAdminProperties(fetchAdminProperties());
      setJustLoggedIn(false); // Reset just logged in state
    }
  }, [justLoggedIn, setAdminProperties]);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div
          style={{
            width: "400px",
            backgroundColor: "#FFFFFF",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "2rem",
          }}
        >
          <h1
            style={{
              fontFamily: "Playfair Display SC, serif",
              fontSize: "36px",
              fontWeight: "bold",
              color: "rgb(140, 103, 133)",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            UNIQUE JEWELRY
          </h1>
          <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#1F2937", marginBottom: "1.5rem" }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="username" style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #D1D5DB",
                  marginTop: "0.25rem",
                }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="password" style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #D1D5DB",
                  marginTop: "0.25rem",
                }}
              />
            </div>
            {error && (
              <p style={{ color: "#DC2626", fontSize: "0.875rem", marginBottom: "1rem", textAlign: "center" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "rgb(228, 213, 230)",
                color: "rgb(0, 0, 0)",
                border: "none",
                borderRadius: "0.375rem",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgb(218, 203, 220)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgb(228, 213, 230)")}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}