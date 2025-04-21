import "../../style/vegetable.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Vegetale() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/products")
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
            <div className="product-card" key={category.category}>
              <div className="product-icon-container">
                <div className="icon-background"></div>
              </div>
              <div className="product-info">
                <Link to={`${category.link}`}>
                  <h1 className="product-name">{category.category}</h1>
                </Link>
                <div className="product-count">
                  <span className="count">{category.product_count}</span> Products
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}