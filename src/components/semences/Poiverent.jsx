
import { useState, useEffect} from "react"
import productsData from "../../data/semences.json"
import axios from "axios"
import "../../style/poiverent.css"
export default function Courgette() {
  const [poiverents, setPoiverents] = useState([])
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
    const fetchPoiverents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products?category=POIVRE")
        setPoiverents(response.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchPoiverents()
  }, [])





  const deletePOI = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette VEGETABLE ?")) {
      axios
        .delete(`http://localhost:8080/products/${id}`)
        .then(() => {
          setPoiverents((prev) => prev.filter((pastequ) => pastequ.id !== id))
        })
        .catch((err) => console.log(err))
    }
  }
 




 
  return (

    <div className="poiverent-container">
    <div className="poiverent-header">
      <h2 className="poiverent-title">Poiverent</h2>
      <div className="poiverent-icon">
       
      </div>
    </div>

    {loading ? (
      <div className="poiverent-loading">Chargement des produits...</div>
    ) : error ? (
      <div className="poiverent-error">{error}</div>
    ) : (
      <div className="poiverent-table-container">
        <table className="poiverent-table">
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
            {poiverents.length > 0 ? (
              poiverents.map((pastequ) => (
                <tr key={pastequ.id}>
                  <td>
                    <div className="poiverent-image-container">
                      <img
                        src={pastequ.image || "/placeholder.svg"}
                        alt={pastequ.nom}
                        className="poiverent-image"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                  </td>
                  <td className="poiverent-name">{pastequ.nom}</td>
                  <td className="poiverent-description">{pastequ.description}</td>
                  <td>
                    <button className="poiverent-button">Ajouter</button>
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
                  onClick={() => deletePOI(pastequ.id)}
                >
                  Delete
                </button></td>

):""}



                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="poiverent-empty">
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
