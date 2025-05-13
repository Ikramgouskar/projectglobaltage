import "../../style/pasteques.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { useCart } from "../CartSystem"
import { ShoppingCart, Check } from "lucide-react"

export default function Pasteques({product}) {
    const { addToCart } = useCart()
  
    const [addedToCart, setAddedToCart] = useState({})
  
  const [pasteques, setPasteques] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stateuser, setStateuser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false)
  const [newPasteque, setnewPasteque] = useState({
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
    const fetchCorgettes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products?category=PASTEQUES")
        setPasteques(response.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchCorgettes()
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
 











  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8080/products", {
        ...newPasteque,
        category: "PASTEQUES",
      })
      setPasteques((prev) => [...prev, response.data])
      setnewPasteque({
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
    setnewPasteque({ ...newPasteque, [name]: value })
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
      "pasteque1.png",
      "pasteque2.png",
   
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
    <div className="pasteque-container">
      <div className="pasteque-header">
        <h2 className="pasteque-title">pasteque</h2>
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
        Ajouter Corgette 
      </button>
      ):""}

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
                {stateuser ? (
                  <th>Action</th>

                ):<th>panier</th>}
                  
              
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

):( <td>
  <button
        style={
          addedToCart[pastequ.id]
            ? { ...buttonStyles.normal, ...buttonStyles.added }
            : buttonStyles.normal
        }
        onClick={() => handleAddToCart(pastequ)}
        disabled={addedToCart[pastequ.id]}
        onMouseOver={(e) => {
          if (!addedToCart[pastequ.id]) {
            e.currentTarget.style.backgroundColor = buttonStyles.hover.backgroundColor
          }
        }}
        onMouseOut={(e) => {
          if (!addedToCart[pastequ.id]) {
            e.currentTarget.style.backgroundColor = buttonStyles.normal.backgroundColor
          }
        }}
      >
        {addedToCart[pastequ.id] ? (
          <>
            <Check size={16} /> Ajouté
          </>
        ) : (
          <>
            <ShoppingCart size={16} /> Ajouter
          </>
        )}
      </button>                         </td>)}




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
           value={newPasteque.image}
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
           value={newPasteque.nom}
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
           value={newPasteque.description}
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
