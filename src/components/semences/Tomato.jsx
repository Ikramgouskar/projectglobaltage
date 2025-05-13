
import { useEffect, useState } from "react"
import productsData from "../../data/semences.json"
import "../../style/tomate.css"
import axios from "axios"
import { useCart } from "../CartSystem"
import { ShoppingCart, Check } from "lucide-react"


export default function Tomato({product}) {
   const { addToCart } = useCart()
  
    const [addedToCart, setAddedToCart] = useState({})
  
  const [tomates, setTomates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stateuser,setStateuser] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCorgette, setnewTomate] = useState({
    image: "",
    nom: "",
 
    description: "",
  })



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







  


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8080/products", {
        ...newCorgette,
        category: "TOMATES",
      })
      setTomates((prev) => [...prev, response.data])
      setnewTomate({
        image: "",
        nom: "",
        description: "",
      })
      closeAddModal()
    } catch (error) {
      console.error("Error adding corgette:", error)
    }
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target
    setnewTomate({ ...newCorgette, [name]: value })
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
      "tomate1.png",
      "tomate2.png",
      "tomate3.png",
      "tomate4.png",
      "tomate5.png"
    ]
    setImages(hardcodedImages)
  }, [])




 



  const handleAddToCart = (product) => {
    addToCart(product)

    // Show added confirmation
    setAddedToCart((prev) => ({
      ...prev,
      [product.id]: true,
    }))

    // Reset after 2 seconds
    setTimeout(() => {
      setAddedToCart((prev) => ({
        ...prev,
        [product.id]: false,
      }))
    }, 2000)
  }

  // Add these styles for the "Ajouter" button
  const buttonStyles = {
    normal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "8px 16px",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    hover: {
      backgroundColor: "#3d9140",
    },
    added: {
      backgroundColor: "#2e7d32",
      cursor: "default",
    },
  }






 
  return (
    <>
    <div className="tomato-container">
      <div className="tomato-header">
        <h2 className="tomato-title">Tomate</h2>

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
         marginTop: "80px",
          marginLeft: "900px",
          
          borderRadius: "5px",
        }}
        onClick={openAddModal}
      >
        Ajouter Tomates 
      </button>
      ):""}


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
                {stateuser ? (
                  <th>Action</th>

                ):<th>panier</th>}
                  
              
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
                ):(<td>
                  <button
                        style={
                          addedToCart[tomate.id]
                            ? { ...buttonStyles.normal, ...buttonStyles.added }
                            : buttonStyles.normal
                        }
                        onClick={() => handleAddToCart(tomate)}
                        disabled={addedToCart[tomate.id]}
                        onMouseOver={(e) => {
                          if (!addedToCart[tomate.id]) {
                            e.currentTarget.style.backgroundColor = buttonStyles.hover.backgroundColor
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!addedToCart[tomate.id]) {
                            e.currentTarget.style.backgroundColor = buttonStyles.normal.backgroundColor
                          }
                        }}
                      >
                        {addedToCart[tomate.id] ? (
                          <>
                            <Check size={16} /> Ajouté
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} /> Ajouter
                          </>
                        )}
                      </button>                       </td>)}
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



  );
}
