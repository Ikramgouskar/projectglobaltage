
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../style/login.css"

export default function Login({ setIsAuthenticated, setAdminProperties }) {
  const [isLogin, setIsLogin] = useState(true)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [justLoggedIn, setJustLoggedIn] = useState(false)

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  }

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target
    setSignupData({ ...signupData, [name]: value })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Check for hardcoded admin
    const validUsername = "ikramgouskar"
    const validPassword = "2005"

    // Get registered admins from localStorage
    const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins")) || []

    // Check if credentials match hardcoded admin or any registered admin
    const isValidHardcoded = credentials.username === validUsername && credentials.password === validPassword
    const registeredAdmin = registeredAdmins.find(
      (admin) => admin.username === credentials.username && admin.password === credentials.password,
    )

    if (isValidHardcoded || registeredAdmin) {
      // Store authentication token and username in localStorage
      localStorage.setItem("token", "authenticated")
      localStorage.setItem("userlogin", credentials.username)

      // If it's a registered admin, store their details
      if (registeredAdmin) {
        localStorage.setItem(
          "currentAdmin",
          JSON.stringify({
            username: registeredAdmin.username,
            fullName: registeredAdmin.fullName,
            email: registeredAdmin.email,
            joinDate: registeredAdmin.joinDate,
          }),
        )
      } else {
        // For hardcoded admin
        localStorage.setItem(
          "currentAdmin",
          JSON.stringify({
            username: validUsername,
            fullName: "Ikram Gouskar",
            email: "admin@uniquejewelry.com",
            joinDate: new Date().toISOString(),
          }),
        )
      }

      setIsAuthenticated(true)
      setJustLoggedIn(true)
      navigate("/")
    } else {
      setError("Invalid username or password")
    }
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validate form
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (signupData.password.length < 4) {
      setError("Password must be at least 4 characters long")
      return
    }

    // Get existing admins
    const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins")) || []

    // Check if username already exists
    if (registeredAdmins.some((admin) => admin.username === signupData.username)) {
      setError("Username already exists")
      return
    }

    // Add new admin
    const newAdmin = {
      fullName: signupData.fullName,
      email: signupData.email,
      username: signupData.username,
      password: signupData.password,
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }

    registeredAdmins.push(newAdmin)
    localStorage.setItem("registeredAdmins", JSON.stringify(registeredAdmins))

    // Show success message and reset form
    setSuccess("Account created successfully! You can now login.")
    setSignupData({
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    })

    // Switch to login view after a delay
    setTimeout(() => {
      setIsLogin(true)
      setSuccess("")
    }, 2000)
  }

  useEffect(() => {
    if (justLoggedIn && localStorage.getItem("token") === "authenticated") {
      // Fetch or update admin properties here if needed
      setJustLoggedIn(false)
    }
  }, [justLoggedIn, setAdminProperties])

  const toggleForm = () => {
    setIsLogin(!isLogin)
    setError("")
    setSuccess("")
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="brand-title">CASEM</h1>

        {isLogin ? (
          <>
            <h2 className="form-title">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-button">
                Login
              </button>
            </form>
            <p className="toggle-form-text">
              New admin?{" "}
              <button onClick={toggleForm} className="toggle-button">
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="form-title">Create Admin Account</h2>
            <form onSubmit={handleSignupSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={signupData.fullName}
                  onChange={handleSignupInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signupUsername">Username</label>
                <input
                  type="text"
                  id="signupUsername"
                  name="username"
                  value={signupData.username}
                  onChange={handleSignupInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signupPassword">Password</label>
                <input
                  type="password"
                  id="signupPassword"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleSignupInputChange}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
              <button type="submit" className="submit-button">
                Create Account
              </button>
            </form>
            <p className="toggle-form-text">
              Already have an account?{" "}
              <button onClick={toggleForm} className="toggle-button">
                Login
              </button>
            </p>
            <br />
          </>
        )}
      </div>
    </div>
  )
}
