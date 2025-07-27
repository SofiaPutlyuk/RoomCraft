import { Banner } from "./components/Banner/Banner";
import { Header } from "./components/Header/Header";
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './main.scss'
import { Register } from "./pages/Register/Register";
import { CreateCharacter } from "./pages/CreateCharacter/CreateCharacter";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-character" element={<CreateCharacter />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
