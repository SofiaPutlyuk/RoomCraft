import { Banner } from "./components/Banner/Banner";
import { Header } from "./components/Header/Header";
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './main.scss'
import { Register } from "./pages/Register/Register";
import { CreateCharacter } from "./pages/CreateCharacter/CreateCharacter";
import { RoomWithQuiz} from "./components/DesignQuiz/DesignQuiz";
import { CardsRoom } from "./components/CardsRoom/CardsRoom";
import { StyleShop } from "./pages/Shop/Shop";
import { Footer } from "./components/Footer/Footer";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-character" element={<CreateCharacter />} />
          <Route path="/shop" element={<StyleShop />} />
        </Routes>
        <CardsRoom />
        <RoomWithQuiz />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
