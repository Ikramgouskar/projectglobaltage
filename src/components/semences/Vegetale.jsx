import { useState, useEffect } from "react";
import "../../style/vegetable.css";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Vegetale() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stateuser, setStateuser] = useState(null);



  useEffect(() => {
    const userlogin = localStorage.getItem("userlogin");
    if (userlogin) {
      setStateuser(userlogin);
    }
  }, [stateuser]);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
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



  const deleteVEGETABLE = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette VEGETABLE ?")) {
      axios
        .delete(`http://localhost:8080/categories/${id}`)
        .then(() => {
          setCategories((prev) => prev.filter((category) => category.id !== id))
        })
        .catch((err) => console.log(err))
    }
  }



 





 
 
  return (
    <>
      <br />

      <div className="product-dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Nos Produits Agricoles</h1>
          <p className="dashboard-subtitle">
            Découvrez notre sélection de semences de qualité supérieure
          </p>
        </div>

        <div className="product-grid">
          {categories.map((category) => (
            <div className="product-card" key={category.id}>
              <div className="product-icon-container">
                <div className="icon-background"></div>
              </div>
              <div className="product-info">
                <Link to={`${category.link}`}>
                  <h1 className="product-name">{category.name}</h1>
                </Link>
                {/* <div className="product-count">
                  <span className="count">{category.product_count}</span> Products
                </div> */}
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
                  onClick={() => deleteVEGETABLE(category.id)}
                >
                  Delete
                </button>
                 ):""}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}