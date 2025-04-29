
import { useEffect, useState } from "react"
import productsData from "../../data/filtsagr.json"
import "../../style/engraissoluble.css"
import axios from "axios"



export default function Filettessgrele() {
  const [filetgrel, setFiletgrel] = useState([])
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
    try {
      const filetgrelCategory = productsData.products.find((product) => product.category === "FILET TISSE ANTI GRÊLE")
      setFiletgrel(filetgrelCategory?.products || [])
      setLoading(false)
    } catch (error) {
      console.error("Error loading engraises:", error)
      setError("Impossible de charger les données. Veuillez réessayer plus tard.")
      setLoading(false)
    }
  }, [])






  const deletegranules = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette VEGETABLE ?")) {
      axios
        .delete(`http://localhost:8001/products/${id}`)
        .then(() => {
          setFiletgrel((prev) => prev.filter((tomate) => tomate.id !== id))
        })
        .catch((err) => console.log(err))
    }
  }





  return (
    <div className="engrais-container">
      <div className="engrais-header">
        <h2 className="engrais-title">FILET TISSE ANTI GRÊLE</h2>
        <div className="engrais-icon">
         
        </div>
      </div>

      {loading ? (
        <div className="engrais-loading">Chargement des produits...</div>
      ) : error ? (
        <div className="engrais-error">{error}</div>
      ) : (
        <div className="engrais-table-container">
          <table className="engrais-table">
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
              {filetgrel.length > 0 ? (
                filetgrel.map((tomate) => (
                  <tr key={tomate.id}>
                    <td>
                      <div className="engrais-image-container">
                        <img
                          src={tomate.image || "/placeholder.svg"}
                          alt={tomate.nom}
                          className="engrais-image"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = "/placeholder.svg"
                          }}
                        />
                      </div>
                    </td>
                    <td className="engrais-name">{tomate.nom}</td>
                    <td className="engrais-description">{tomate.description}</td>
                    <td>
                      <button className="engrais-button">Ajouter</button>
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
                  onClick={() => deletegranules(tomate.id)}
                >
                  Delete
                </button></td>

):""}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="engrais-empty">
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
