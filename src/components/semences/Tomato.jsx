
import { useEffect, useState } from "react"
import productsData from "../../data/semences.json"
import "../../style/tomate.css"
import axios from "axios"

export default function Tomato() {
  const [tomates, setTomates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stateuser,setStateuser] = useState(null)


  useEffect(() => {
    const fetchTomates = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products?category=TOMATES")
        setTomates(response.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchTomates()
  }, []);








  const deleteTOMATE = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette VEGETABLE ?")) {
      axios
        .delete(`http://localhost:8080/products/${id}`)
        .then(() => {
          setTomates((prev) => prev.filter((tomate) => tomate.id !== id))
        })
        .catch((err) => console.log(err))
    }
  }






  useEffect(() => {
    const userlogin = localStorage.getItem("userlogin");
    if (userlogin) {
      setStateuser(userlogin);
    }
  }, [stateuser]);
 
  return (
    <div className="tomato-container">
      <div className="tomato-header">
        <h2 className="tomato-title">Tomate</h2>
        <div className="tomato-icon">
         
        </div>
      </div>

      {loading ? (
        <div className="tomato-loading">Chargement des produits...</div>
      ) : error ? (
        <div className="tomato-error">{error}</div>
      ) : (
        <div className="tomato-table-container">
          <table className="tomato-table">
            <thead>
              <tr>
                <th>PRODUIT</th>
                <th>NOM</th>
                <th>DESCRIPTION</th>
                <th>panier</th>
                {stateuser ? (
                <th>Action</th>
              ):""}
              </tr>
            </thead>
            <tbody>
              {tomates.length > 0 ? (
                tomates.map((tomate) => (
                  <tr key={tomate.id}>
                    <td>
                      <div className="tomato-image-container">
                        <img
                          src={tomate.image || "/placeholder.svg"}
                          alt={tomate.nom}
                          className="tomato-image"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = "/placeholder.svg"
                          }}
                        />
                      </div>
                    </td>
                    <td className="tomato-name">{tomate.nom}</td>
                    <td className="tomato-description">{tomate.description}</td>
                    <td>
                      <button className="tomato-button">Ajouter</button>
                    </td>

                    {stateuser ? (
                    <td><button
                  style={{
                    
                    width:"100px",
                      height: "30px",
                    margin: "2rem",
                     
                      borderRadius: "0.5rem",
                      backgroundColor: "rgb(145, 41, 41)",
                      color: "#FFFFFF",
                      border: "none",
                     
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                  onMouseEnter={(ev) => (ev.currentTarget.style.backgroundColor = "#B91C1C")}
                  onMouseLeave={(ev) => (ev.currentTarget.style.backgroundColor = "#DC2626")}
                  onClick={() => deleteTOMATE(tomate.id)}
                >
                  Delete
                </button></td>
                ):""}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="tomato-empty">
                    Aucun produit disponible
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
