
import { useEffect, useState } from "react"
import "../../style/engraissoluble.css"
import axios from "axios"
import { useCart } from "../CartSystem"
import { ShoppingCart, Check } from "lucide-react"


export default function Acidesamine({product}) {
  const { addToCart } = useCart()
  const [addedToCart, setAddedToCart] = useState({})

  const [acides, setAcides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stateuser, setStateuser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false)

  const [newSobule, setnewSobule] = useState({
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
        const response = await axios.get("http://localhost:8002/products?category=ACIDES AMINES")
        setAcides(response.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchCorgettes()
  }, [])



  const deleteENGRAI = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette VEGETABLE ?")) {
      axios
        .delete(`http://localhost:8002/products/${id}`)
        .then(() => {
          setAcides((prev) => prev.filter((tomate) => tomate.id !== id))
        })
        .catch((err) => console.log(err))
    }
  }











  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8002/products", {
        ...newSobule,
        category: "ACIDES AMINES",
      })
      setAcides((prev) => [...prev, response.data])
      setnewSobule({
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
    setnewSobule({ ...newSobule, [name]: value })
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
    <div className="engrais-container">
      <div className="engrais-header">
        <h2 className="engrais-title">ACIDES AMINES</h2>
        {stateuser ? (
      <button
        style={{
          width: "400px",
          height: "45px",
          backgroundColor: "rgb(156, 180, 156)",
          color: "black",
          border: "none",
          padding: "5px",
          cursor: "pointer",
         marginTop: "200px",
         fontSize: "15px",
          marginLeft: "700px",
          
          borderRadius: "5px",
        }}
        onClick={openAddModal}
      >
        Ajouter Acide amine 
      </button>
      ):""}

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
                {stateuser ? (
                   <th>Action</th>
                  ): <th>panier</th>}
              </tr>
            </thead>
            <tbody>
              {acides.length > 0 ? (
                acides.map((tomate) => (
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
                    


                    {stateuser ? (
                    <button
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
                  onClick={() => deleteENGRAI(tomate.id)}
                >
                  Delete
                </button>

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
      </button>                    </td>)}


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
       Ajouter un Acide amine
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
           value={newSobule.image}
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
           value={newSobule.nom}
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
           value={newSobule.description}
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
