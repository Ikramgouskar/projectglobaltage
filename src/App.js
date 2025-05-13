import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/CartSystem"
import Header from "./components/Header";
import Home from "./components/Home";
import Vegetale from "./components/semences/Vegetale";
import Footer from "./components/Footer";
import Tomato from "./components/semences/Tomato";
import Courgette from "./components/semences/Courjette";
import Pasteque from "./components/semences/Pasteques";
import Poiverent from "./components/semences/Poiverent";
import Melon from "./components/semences/Melon";
import About from "./components/About";
import Contact from "./components/Contact";
import Tourbe from "./components/Tourbe/Tourbe";
import Tourbesemis from "./components/Tourbe/Tourbesemis";
import Tourberempotage from "./components/Tourbe/Tourberempotage";
import Tourbefruitsrouge from "./components/Tourbe/Tourbefruitsrouge";
import Tourbemelange from "./components/Tourbe/Tourbemelange";
import Tourbecoco from "./components/Tourbe/Tourbecoco";
import Engrais from "./components/engrai/Engrais";     
import Engraisoluble from "./components/engrai/Engraisoluble";
import Npksolubles from "./components/engrai/Npksolubles";
import Granules from "./components/engrai/Granules";
import Filets from "./components/filetsagricoles/filets";
import Filetantithrips from "./components/filetsagricoles/filetantithrips";
import Filettisseombrage from "./components/filetsagricoles/filettisseombrage";
import Filettessgrele from "./components/filetsagricoles/filettssegrele";
import Biostimulants from "./components/boitstimulant/boitstimulant";
import Boitsti from "./components/boitstimulant/boitsti";
import OligoElementns from "./components/boitstimulant/oligoelements";
import Acidesamine from "./components/boitstimulant/acidesamine";
import Profil from "./components/Profil";
import Settigs from "./components/Settigs";
import Panier from "./components/Panier";



import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Login from "./components/login";
import Orders from "./components/orders";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />
    }
    return children
  }





  return (
   
<BrowserRouter>
      <Header
      isAuthenticated={isAuthenticated}
      setIsAuthenticated={setIsAuthenticated}
      
      
 />
 <CartProvider>
      
      <Routes >
        <Route path="/"element={ <Home /> }/>

        <Route path="/produit" element={   <ProtectedRoute><Vegetale /></ProtectedRoute>} />
        <Route path="/tomate" element={ <ProtectedRoute><Tomato /></ProtectedRoute>} />
        <Route path="/corgette" element={<ProtectedRoute><Courgette /></ProtectedRoute>} />
        <Route path="/poiverent" element={<ProtectedRoute><Poiverent /></ProtectedRoute>} />
        <Route path="/pasteque" element={<ProtectedRoute><Pasteque /></ProtectedRoute>} />
        <Route path="/melon" element={<ProtectedRoute><Melon /></ProtectedRoute>} /> 
        <Route path="/profile" element={<ProtectedRoute><Profil /></ProtectedRoute>} /> 
        <Route path="/sitting" element={<ProtectedRoute><Settigs /></ProtectedRoute>} /> 
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} /> 
         
        <Route path="/panier" element={<Panier />} /> 

        <Route path="/about" element={<About />} /> 
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/tourb" element={<ProtectedRoute><Tourbe/></ProtectedRoute>} />
        <Route path="/tourbsemis" element={ <ProtectedRoute><Tourbesemis/></ProtectedRoute>} />
        <Route path="/tourberempotage" element={<ProtectedRoute><Tourberempotage/></ProtectedRoute>} />
        <Route path="/tourbefruitsrouge" element={<ProtectedRoute><Tourbefruitsrouge/></ProtectedRoute>} />
        <Route path="/tourbemelange" element={<ProtectedRoute><Tourbemelange/></ProtectedRoute>} />
        <Route path="/tourbecoco" element={<ProtectedRoute><Tourbecoco/></ProtectedRoute>} />
       
        
        <Route path="/engrai" element={ <ProtectedRoute><Engrais/></ProtectedRoute>} />
        <Route path="/engraisoluble" element={<ProtectedRoute><Engraisoluble/></ProtectedRoute>} />
        <Route path="/npksoluble" element={<ProtectedRoute><Npksolubles/></ProtectedRoute>} />
        <Route path="/granules" element={<ProtectedRoute><Granules/></ProtectedRoute>} />


        <Route path="/filets" element={<ProtectedRoute><Filets/></ProtectedRoute>} />
        <Route path="/filetanatith" element={<ProtectedRoute><Filetantithrips/></ProtectedRoute>} />
        <Route path="/filettisseombrage" element={<ProtectedRoute><Filettisseombrage/></ProtectedRoute>} />
        <Route path="/flitetisse" element={<ProtectedRoute><Filettessgrele/></ProtectedRoute>} />


        <Route path="/boitstimulant" element={<ProtectedRoute><Biostimulants/></ProtectedRoute>} />
        <Route path="/biotsti" element={<ProtectedRoute><Boitsti/></ProtectedRoute>} />
        <Route path="/oligoelemts" element={<ProtectedRoute><OligoElementns/></ProtectedRoute>} />
        <Route path="/acidesamines" element={<ProtectedRoute><Acidesamine/></ProtectedRoute>} />



        <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />


      </Routes>
      </CartProvider>
      <Footer />
   
    </BrowserRouter>


  );
}

export default App;
