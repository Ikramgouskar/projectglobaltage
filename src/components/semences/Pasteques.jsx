import productsData from "../../data/semences.json"
import "../../style/pasteques.css"
import { useState, useEffect } from "react"
import axios from "axios"
export default function Pasteques() {
  const [pasteques, setPasteques] = useState([])
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
    const fetchPasteques = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products?category=PASTEQUES")
        setPasteques(response.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchPasteques()
  }, [])






  
  const deletePA = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette VEGETABLE ?")) {
      axios
        .delete(`http://localhost:8080/products/${id}`)
        .then(() => {
          setPasteques((prev) => prev.filter((tomate) => tomate.id !== id))
        })
        .catch((err) => console.log(err))
    }
  }
 



  return (
    <div className="pasteque-container">
      <div className="pasteque-header">
        <h2 className="pasteque-title">pasteque</h2>
        <div className="pasteque-icon">
         
        </div>
      </div>

      {loading ? (
        <div className="pasteque-loading">Chargement des produits...</div>
      ) : error ? (
        <div className="pasteque-error">{error}</div>
      ) : (
        <div className="pasteque-table-container">
          <table className="pasteque-table">
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
              {pasteques.length > 0 ? (
                pasteques.map((pastequ) => (
                  <tr key={pastequ.id}>
                    <td>
                      <div className="pasteque-image-container">
                        <img
                          src={pastequ.image || "/placeholder.svg"}
                          alt={pastequ.nom}
                          className="pasteque-image"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = "/placeholder.svg"
                          }}
                        />
                      </div>
                    </td>
                    <td className="pasteque-name">{pastequ.nom}</td>
                    <td className="pasteque-description">{pastequ.description}</td>
                    <td>
                      <button className="pasteque-button">Ajouter</button>
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
                  onClick={() => deletePA(pastequ.id)}
                >
                  Delete
                </button></td>

):""}




                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="pasteque-empty">
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
