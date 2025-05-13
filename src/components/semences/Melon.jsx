
import { useState, useEffect} from "react"
import axios from "axios"
import "../../style/melon.css"
import { useCart } from "../CartSystem"
import { ShoppingCart, Check } from "lucide-react"

export default function Melon({product}) {
    const { addToCart } = useCart()
  
    const [addedToCart, setAddedToCart] = useState({})
  
  const [melons, setMelons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stateuser, setStateuser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false)
  const [newMellon, setnewMellon] = useState({
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
 




  


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8080/products", {
        ...newMellon,
        category: "MELONS",
      })
      setMelons((prev) => [...prev, response.data])
      setnewMellon({
        image: "",
        nom: "",
        description: "",
      })
      closeAddModal()
    } catch (error) {
      console.error("Error adding Mellon:", error)
    }
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target
    setnewMellon({ ...newMellon, [name]: value })
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
      "melon1.png",
      "melon2.png",
      "melon3.png",
      "melon4.png"
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
    <div className="melon-container">
    <div className="melon-header">
      <h2 className="melon-title">melon</h2>

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
        Ajouter Mellon
      </button>
      ):""}
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
              {stateuser ? (
                  <th>Action</th>

                ):<th>panier</th>}
                  
              
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


):(  <td>
  <button
          style={
            addedToCart[melon.id]
              ? { ...buttonStyles.normal, ...buttonStyles.added }
              : buttonStyles.normal
          }
          onClick={() => handleAddToCart(melon)}
          disabled={addedToCart[melon.id]}
          onMouseOver={(e) => {
            if (!addedToCart[melon.id]) {
              e.currentTarget.style.backgroundColor = buttonStyles.hover.backgroundColor
            }
          }}
          onMouseOut={(e) => {
            if (!addedToCart[melon.id]) {
              e.currentTarget.style.backgroundColor = buttonStyles.normal.backgroundColor
            }
          }}
        >
          {addedToCart[melon.id] ? (
            <>
              <Check size={16} /> Ajouté
            </>
          ) : (
            <>
              <ShoppingCart size={16} /> Ajouter
            </>
          )}
        </button>   </td>)}

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





  {showAddModal && (
 <div
 className="modal-backdrop"
 style={{
   position: "fixed",
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   backgroundColor: "rgba(0,0,0,0.6)",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   zIndex: 1050,
 }}
>
 <div
   className="modal-container"
   style={{
     backgroundColor: "white",
     borderRadius: "12px",
     width: "500px",
     maxWidth: "95%",
     boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
     animation: "fadeIn 0.3s ease-out",
     overflow: "hidden",
   }}
 >
   <div
     className="modal-header"
     style={{
       padding: "20px 25px",
       borderBottom: "1px solid #f0f0f0",
       display: "flex",
       justifyContent: "space-between",
       alignItems: "center",
     }}
   >
     <h5
       style={{
         margin: 0,
         fontSize: "20px",
         fontWeight: "600",
         color: "#333",
       }}
     >
       Ajouter Courgette
     </h5>
     <button
       onClick={closeAddModal}
       style={{
         background: "transparent",
         border: "none",
         fontSize: "22px",
         cursor: "pointer",
         color: "#999",
         transition: "color 0.2s",
       }}
       onMouseOver={(e) => (e.currentTarget.style.color = "#333")}
       onMouseOut={(e) => (e.currentTarget.style.color = "#999")}
     >
       ×
     </button>
   </div>

   <div className="modal-body" style={{ padding: "25px" }}>
     <form onSubmit={handleSubmit}>
       <div style={{ marginBottom: "20px" }}>
         <label
           style={{
             display: "block",
             marginBottom: "8px",
             fontWeight: "500",
             color: "#444",
           }}
         >
           Image
         </label>
         <select
           style={{
             width: "100%",
             padding: "12px 15px",
             borderRadius: "8px",
             border: "1px solid #ddd",
             backgroundColor: "#f9f9f9",
             fontSize: "15px",
             transition: "border-color 0.2s, box-shadow 0.2s",
             outline: "none",
           }}
           name="image"
           value={newMellon.image}
           onChange={handleInputChange}
           required
           onFocus={(e) => {
             e.target.style.borderColor = "#a3c9ff"
             e.target.style.boxShadow = "0 0 0 3px rgba(66, 153, 225, 0.15)"
           }}
           onBlur={(e) => {
             e.target.style.borderColor = "#ddd"
             e.target.style.boxShadow = "none"
           }}
         >
           <option value="">Sélectionner une image</option>
           {images.map((image, index) => (
             <option key={index} value={`/imagedecourgettes/${image}`}>
               {image}
             </option>
           ))}
         </select>

        
       </div>

       <div style={{ marginBottom: "20px" }}>
         <label
           style={{
             display: "block",
             marginBottom: "8px",
             fontWeight: "500",
             color: "#444",
           }}
         >
           Nom
         </label>
         <input
           type="text"
           style={{
             width: "100%",
             padding: "12px 15px",
             borderRadius: "8px",
             border: "1px solid #ddd",
             backgroundColor: "#f9f9f9",
             fontSize: "15px",
             transition: "border-color 0.2s, box-shadow 0.2s",
             outline: "none",
           }}
           name="nom"
           value={newMellon.nom}
           onChange={handleInputChange}
           required
           onFocus={(e) => {
             e.target.style.borderColor = "#a3c9ff"
             e.target.style.boxShadow = "0 0 0 3px rgba(66, 153, 225, 0.15)"
           }}
           onBlur={(e) => {
             e.target.style.borderColor = "#ddd"
             e.target.style.boxShadow = "none"
           }}
         />
       </div>

       <div style={{ marginBottom: "25px" }}>
         <label
           style={{
             display: "block",
             marginBottom: "8px",
             fontWeight: "500",
             color: "#444",
           }}
         >
           Description
         </label>
         <textarea
           style={{
             width: "100%",
             padding: "12px 15px",
             borderRadius: "8px",
             border: "1px solid #ddd",
             backgroundColor: "#f9f9f9",
             fontSize: "15px",
             minHeight: "100px",
             resize: "vertical",
             transition: "border-color 0.2s, box-shadow 0.2s",
             outline: "none",
           }}
           name="description"
           value={newMellon.description}
           onChange={handleInputChange}
           required
           onFocus={(e) => {
             e.target.style.borderColor = "#a3c9ff"
             e.target.style.boxShadow = "0 0 0 3px rgba(66, 153, 225, 0.15)"
           }}
           onBlur={(e) => {
             e.target.style.borderColor = "#ddd"
             e.target.style.boxShadow = "none"
           }}
         />
       </div>

       <div
         className="modal-actions"
         style={{
           display: "flex",
           gap: "15px",
           marginTop: "10px",
         }}
       >
         <button
           type="button"
           onClick={closeAddModal}
           style={{
             flex: "1",
             padding: "12px",
             borderRadius: "8px",
             border: "1px solid #ddd",
             backgroundColor: "#f5f5f5",
             color: "#555",
             fontSize: "15px",
             fontWeight: "500",
             cursor: "pointer",
             transition: "all 0.2s",
           }}
           onMouseOver={(e) => {
             e.currentTarget.style.backgroundColor = "#eaeaea"
           }}
           onMouseOut={(e) => {
             e.currentTarget.style.backgroundColor = "#f5f5f5"
           }}
         >
           Annuler
         </button>
         <button
           type="submit"
           style={{
             flex: "1",
             padding: "12px",
             borderRadius: "8px",
             border: "none",
             backgroundColor: "rgb(85, 112, 85)", // Pink to match the add button
             color: "#fff",
             fontSize: "15px",
             fontWeight: "500",
             cursor: "pointer",
             transition: "all 0.2s",
           }}
           
         >
           Ajouter
         </button>
       </div>
     </form>
   </div>
 </div>
</div>
)}

</>
  )
}
