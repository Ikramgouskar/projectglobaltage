
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { CartIcon } from "./CartSystem"

import "../style/header.css"

export default function Header({ isAuthenticated, setIsAuthenticated }) {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate();
  const [stateuser, setStateuser] = useState(null);



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])





  useEffect(() => {
    const userlogin = localStorage.getItem("userlogin");
    if (userlogin) {
      setStateuser(userlogin);
    }
  }, [isAuthenticated]);

  const handlerlogaut = () => {
    localStorage.removeItem("userlogin");
    setStateuser(null);
    setIsAuthenticated(false);
    navigate("/");
    
  };


  
  const handleSelectChange = (e) => {
    const value = e.target.value

    if (value === "profile") {
      navigate("/profile")
    } else if (value === "settings") {
      navigate("/sitting")
    } else if (value === "logout") {
      handlerlogaut()
    }
  }



  return (
    <nav class={`navbar ${scrolled ? "scrolled" : ""}`}>

      <div class="nav-container">
        
        <ul>
          <li class="logo-container">
            <div class="logo-wrapper">
            <Link to="/" className="logo-link"> 
              <img src="/image logo/logo.png" alt="logo image" /></Link>
            </div>
          </li>








          <div class="nav-links">




          {stateuser ? (
              <>
<li>
              <Link to="/produit">
                <span class="link-text">Nos produit</span>
                <span class="link-hover-effect"></span>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <span class="link-text">A propos</span>
                <span class="link-hover-effect"></span>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <span class="link-text">Contact</span>
                <span class="link-hover-effect"></span>
              </Link>
            </li>
            <li>
              <Link to="/orders">
                <span class="link-text">Orders</span>
                <span class="link-hover-effect"></span>
              </Link>
            </li>
       



            <select 
                  onChange={handleSelectChange}
                  defaultValue=""
                  className="profile-select"
                >
                  <option value="" disabled>action</option>
                 
                  <option value="profile">Profile</option>
                  <option value="settings">Setting</option>
                  <option value="logout">Déconnexion</option>
                </select>
              </>

        ) : (
          <>
            <li>
              <Link to="/produit">
                <span class="link-text">Nos produit</span>
                <span class="link-hover-effect"></span>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <span class="link-text">A propos</span>
                <span class="link-hover-effect"></span>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <span class="link-text">Contact</span>
                <span class="link-hover-effect"></span>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <span class="link-text">Connexion</span>
                <span class="link-hover-effect"></span>
              </Link>
            </li>

            <li>
              <Link to="/panier">
                <span className="link-text">Panier</span>
                <span className="link-hover-effect"></span>
                <CartIcon />
              </Link>
            </li>
            </>
          )}




          </div>
        </ul>
      </div>

     
    </nav>
  )
}
