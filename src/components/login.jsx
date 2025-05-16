
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../style/login.css"

export default function Login({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [justLoggedIn, setJustLoggedIn] = useState(false)

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  }


  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Check for hardcoded admin
    const validUsername = "ikramgouskar"
    const validPassword = "2005"

    // Get registered admins from localStorage

    // Check if credentials match hardcoded admin or any registered admin
    const isValidHardcoded = credentials.username === validUsername && credentials.password === validPassword
 

    if (isValidHardcoded ) {
      // Store authentication token and username in localStorage
      localStorage.setItem("token", "authenticated")
      localStorage.setItem("userlogin", credentials.username)

      // If it's a registered admin, store their details
     
      

      setIsAuthenticated(true)
      setJustLoggedIn(true)
      navigate("/")
      window.location.reload()
    } else {
      setError("Invalid username or password")
    }
  }



  useEffect(() => {
    if (justLoggedIn && localStorage.getItem("token") === "authenticated") {
      // Fetch or update admin properties here if needed
      setJustLoggedIn(false)
    }
  }, [justLoggedIn])

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
           
          </>
        ) : (""
          
        )}
      </div>
    </div>
  )
}
