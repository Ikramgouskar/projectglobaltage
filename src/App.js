import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Vegetale from "./components/Vegetale";
import Footer from "./components/Footer";
import Tomato from "./components/Tomato";
import Courgette from "./components/Courjette";
import Pasteque from "./components/Pasteques";
import Poiverent from "./components/Poiverent";
import Melon from "./components/Melon";
import About from "./components/About";
import Contact from "./components/Contact";
import Tourbe from "./components/Tourbe";
import Tourbesemis from "./components/Tourbesemis";





function App() {
  return (
   
<BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/"element={<Home />}/>
        <Route path="/produit" element={<Vegetale />} />
        <Route path="/tomate" element={<Tomato />} />
        <Route path="/corgette" element={<Courgette />} />
        <Route path="/poiverent" element={<Poiverent />} />
        <Route path="/pasteque" element={<Pasteque />} />
        <Route path="/melon" element={<Melon />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/tourb" element={<Tourbe/>} />
        <Route path="/tourbsemis" element={<Tourbesemis/>} />



      </Routes>
      <Footer />
   
    </BrowserRouter>


  );
}

export default App;
