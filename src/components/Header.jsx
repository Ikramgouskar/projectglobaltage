
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

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

          <button
                  onClick={handlerlogaut}
                  className="logout-button"
                >
                  Déconnexion
                </button>
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
            </>
          )}




          </div>
        </ul>
      </div>

     
    </nav>
  )
}
