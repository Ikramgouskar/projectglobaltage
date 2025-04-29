
import { useState, useEffect } from "react"
import "../../style/engrai.css"
import { Link } from "react-router-dom";
import axios from "axios"

import { ArrowRight } from "lucide-react"


export default function Engrais() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stateuser, setStateuser] = useState(null);
  useEffect(() => {
    const userlogin = localStorage.getItem("userlogin");
    if (userlogin) {
      setStateuser(userlogin);
    }
  }, [stateuser]);



    useEffect(() => {
        fetch("http://localhost:8000/products")
          .then((response) => {
            
            return response.json();
          })
          .then((data) => {
            setCategories(data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      }, []);
    
      if (loading) return <div className="loading">Loading...</div>;
      if (error) return <div className="error">Error: {error.message}</div>;
    

  




      

  const deleteENGRAI = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette VEGETABLE ?")) {
      axios
        .delete(`http://localhost:8000/products/${id}`)
        .then(() => {
          setCategories((prev) => prev.filter((category) => category.id !== id))
        })
        .catch((err) => console.log(err))
    }
  }






  // Fertilizer bag SVG as a component for direct use
  const FertilizerBagIcon = () => (
    <svg
      className="fertilizer-icon"
      width="100"
      height="120"
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 30C20 30 25 15 50 15C75 15 80 30 80 30L90 40V110C90 110 75 120 50 120C25 120 10 110 10 110V40L20 30Z"
        stroke="#3C4A3E"
        strokeWidth="3"
        fill="none"
      />
      <path d="M25 35C25 35 30 25 50 25C70 25 75 35 75 35" stroke="#3C4A3E" strokeWidth="2" fill="none" />
      <rect x="30" y="50" width="40" height="35" rx="4" fill="#3C4A3E" />
      <path d="M45 60C45 60 50 55 55 60C60 65 55 70 55 70" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 70C50 70 50 75 50 80" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
      <path d="M45 65C45 65 40 67 42 72" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 65C55 65 60 67 58 72" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )

  return (
    <div className="engrais-container">
      <h1 className="engrais-title">Nos Engrais</h1>

      {loading ? (
        <div className="engrais-loading">Chargement des catégories...</div>
      ) : error ? (
        <div className="engrais-error">{error}</div>
      ) : (
        <div className="engrais-grid">
          {categories.map((category) => (
            <div key={category.id} className="engrais-category">
              <div className="engrais-icon-container">
                <FertilizerBagIcon />
              </div>
              <div className="engrais-category-info">
                <h2 className="engrais-category-name">{category.category}</h2>
                <p className="engrais-product-count">{category.product_count} Products</p>
              </div>
              <div className="engrais-hover-overlay">
              <Link to={`${category.link}`}>
                <button className="engrais-view-button">
                  Voir les produits <ArrowRight size={16} />
                </button>
                </Link>
              </div>
              {stateuser ? (
              <button
                  style={{
                    
                  width:"300px",
                    height: "30px",
                  margin: "2rem",
                   
                    borderRadius: "0.5rem",
                    backgroundColor: "rgb(220, 38, 38)",
                    color: "#FFFFFF",
                    border: "none",
                   
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(ev) => (ev.currentTarget.style.backgroundColor = "#B91C1C")}
                  onMouseLeave={(ev) => (ev.currentTarget.style.backgroundColor = "#DC2626")}
                  onClick={() => deleteENGRAI(category.id)}
                >
                  Delete
                </button>
                  ):""}
            </div>

           
          ))}
        </div>
      )}
    </div>
  )
}
