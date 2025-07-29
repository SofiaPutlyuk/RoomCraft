import { useState } from "react";
import { Banner } from "./components/Banner/Banner";
import { Header } from "./components/Header/Header";
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './main.scss'
import { Register } from "./pages/Register/Register";
import { CreateCharacter } from "./pages/CreateCharacter/CreateCharacter";
import { RoomWithQuiz} from "./components/DesignQuiz/DesignQuiz";
import { CardsRoom } from "./components/CardsRoom/CardsRoom";
import { StyleShop } from "./pages/Shop/Shop";
import { ChooseRoom } from "./pages/ModalChooseRoom/ChooseRoom";
import { Footer } from "./components/Footer/Footer";
function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <div className="container">
        <Header  user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/create-character" element={<CreateCharacter />} />
          <Route path="/shop" element={<StyleShop />} />
          <Route path="/choose-room" element={<ChooseRoom />} />
        </Routes>
        <CardsRoom />
        <RoomWithQuiz />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
