import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Tourbe from "./components/Tourbe";
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
        <Route path="/tourberempotage" element={<Tourberempotage/>} />
        <Route path="/tourbefruitsrouge" element={<Tourbefruitsrouge/>} />
        <Route path="/tourbemelange" element={<Tourbemelange/>} />
        <Route path="/tourbecoco" element={<Tourbecoco/>} />
        
        
        <Route path="/engrai" element={<Engrais/>} />
        <Route path="/engraisoluble" element={<Engraisoluble/>} />
        <Route path="/npksoluble" element={<Npksolubles/>} />
        <Route path="/granules" element={<Granules/>} />


        <Route path="/filets" element={<Filets/>} />
        <Route path="/filetanatith" element={<Filetantithrips/>} />
        <Route path="/filettisseombrage" element={<Filettisseombrage/>} />
        <Route path="/flitetisse" element={<Filettessgrele/>} />


        <Route path="/boitstimulant" element={<Biostimulants/>} />
        <Route path="/biotsti" element={<Boitsti/>} />
        <Route path="/oligoelemts" element={<OligoElementns/>} />
        <Route path="/acidesamines" element={<Acidesamine/>} />

      </Routes>
      <Footer />
   
    </BrowserRouter>


  );
}

export default App;
