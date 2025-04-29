
import { useState, useEffect} from "react"
import productsData from "../../data/semences.json"
import "../../style/corgette.css"
import axios from "axios"
export default function Courjette() {
  const [corgettes, setCorgettes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stateuser, setStateuser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCorgette, setnewCorgette] = useState({
    image: "",
    nom: "",
 
    description: "",
  })








  useEffect(() => {
    const userlogin = localStorage.getItem("userlogin");
    if (userlogin) {
      setStateuser(userlogin);
    }
  }, [stateuser]);


  useEffect(() => {
    try {
      const corgetteCategory = productsData.products.find((product) => product.category === "COURGETTES")
      setCorgettes(corgetteCategory?.products || [])
      setLoading(false)
    } catch (error) {
      console.error("Error loading corgettes:", error)
      setError("Impossible de charger les données. Veuillez réessayer plus tard.")
      setLoading(false)
    }
  }, [])








  
  const deleteCORGETTE = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette VEGETABLE ?")) {
      axios
        .delete(`http://localhost:8080/products/${id}`)
        .then(() => {
          setCorgettes((prev) => prev.filter((corgette) => corgette.id !== id))
        })
        .catch((err) => console.log(err))
    }
  }






  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8080/products/9fb9", newCorgette)
      setCorgettes([...corgettes, newCorgette])
      closeAddModal()
    } catch (error) {
      console.error("Error adding Corgette:", error)
    }
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target
    setnewCorgette({ ...newCorgette, [name]: value })
  }

  const openAddModal = () => {
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }



  const [images, setImages] = useState([])
  useEffect(() => {
    // Hardcoded image names
    const hardcodedImages = [
      "corgete1.png",
      "corgete2.png",
      "corgete3.png",
      "corgete4.png",
      "corgete5.png",
      "corgete6.png",
    ]
    setImages(hardcodedImages)
  }, [])




 


  return (
    <>
      <div className="corgette-container">
        <div className="corgette-header">
          <h2 className="corgette-title">corgette</h2>
          {stateuser ? (
      <button
        style={{
          width: "250px",
          height: "45px",
          backgroundColor: "pink",
          color: "black",
          border: "none",
          padding: "5px",
          cursor: "pointer",
         marginTop: "40px",
          marginLeft: "900px",
          
          borderRadius: "5px",
        }}
        onClick={openAddModal}
      >
        Ajouter Corgette 
      </button>
      ):""}



          <div className="corgette-icon">
           
          </div>
        </div>
  
        {loading ? (
          <div className="corgette-loading">Chargement des produits...</div>
        ) : error ? (
          <div className="corgette-error">{error}</div>
        ) : (
          <div className="corgette-table-container">
            <table className="corgette-table">
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
                {corgettes.length > 0 ? (
                  corgettes.map((corgette) => (
                    <tr key={corgette.id}>
                      <td>
                        <div className="corgette-image-container">
                          <img
                            src={corgette.image || "/placeholder.svg"}
                            alt={corgette.nom}
                            className="corgette-image"
                            onError={(e) => {
                              e.currentTarget.onerror = null
                              e.currentTarget.src = "/placeholder.svg"
                            }}
                          />
                        </div>
                      </td>
                      <td className="corgette-name">{corgette.nom}</td>
                      <td className="corgette-description">{corgette.description}</td>
                      <td>
                        <button className="corgette-button">Ajouter</button>
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
                  onClick={() => deleteCORGETTE(corgette.id)}
                >
                  Delete
                </button></td>

):""}  


                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="corgette-empty">
                      Aucun produit disponible
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>








{showAddModal && (
  <div className="modal" style={{ display: "block" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Ajouter Bague</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={closeAddModal}
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Photo URL</label>
            
              <select
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #d1d5db" }}
                      name="image"
                      value={newCorgette.image}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an image</option>
                      {images.map((image, index) => (
                        <option key={index} value={`/imagedecourgettes/${image}`}>
                          {image}
                        </option>
                      ))}
                    </select>

            </div>

            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom
              </label>
              <input
                type="text"
                className="form-control"
                id="nom"
                name="nom"
                value={newCorgette.nom}
                onChange={handleInputChange}
                required
              />
            </div>



            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                decription
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={newCorgette.description}
                onChange={handleInputChange}
                required
              />
            </div>





           
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeAddModal}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
)}


</>








    )
}
