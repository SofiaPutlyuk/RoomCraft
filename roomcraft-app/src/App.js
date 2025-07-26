import { Banner } from "./components/Banner/Banner";
import { Header } from "./components/Header/Header";
import './main.scss'
function App() {
  return (
    <div className="container">
      <Header />
      <Banner/>
    </div>
  );
}

export default App;
