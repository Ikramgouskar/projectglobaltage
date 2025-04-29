
import { useState, useEffect} from "react"
import productsData from "../../data/semences.json"
import axios from "axios"
import "../../style/melon.css"
export default function Melon() {
  const [melons, setMelons] = useState([])
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
    const fetchMelons = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products?category=MELONS")
        setMelons(response.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchMelons()
  }, [])



  const deleteMELON = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette VEGETABLE ?")) {
      axios
        .delete(`http://localhost:8080/products/${id}`)
        .then(() => {
          setMelons((prev) => prev.filter((melon) => melon.id !== id))
        })
        .catch((err) => console.log(err))
    }
  }
 










  return (
    <div className="melon-container">
    <div className="melon-header">
      <h2 className="melon-title">melon</h2>
      <div className="melon-icon">
       
      </div>
    </div>

    {loading ? (
      <div className="melon-loading">Chargement des produits...</div>
    ) : error ? (
      <div className="melon-error">{error}</div>
    ) : (
      <div className="melon-table-container">
        <table className="melon-table">
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
            {melons.length > 0 ? (
              melons.map((melon) => (
                <tr key={melon.id}>
                  <td>
                    <div className="melon-image-container">
                      <img
                        src={melon.image || "/placeholder.svg"}
                        alt={melon.nom}
                        className="melon-image"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                  </td>
                  <td className="melon-name">{melon.nom}</td>
                  <td className="melon-description">{melon.description}</td>
                  <td>
                    <button className="melon-button">Ajouter</button>
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
                  onClick={() => deleteMELON(melon.id)}
                >
                  Delete
                </button></td>


):""}

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="melon-empty">
                  Aucun produit disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}
  </div>
  )
}
