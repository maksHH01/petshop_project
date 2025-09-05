import "./App.css";
import Header from "./components/header";
import Main from "./pages/main/index";
import Categories from "./pages/categories";
import Products from "./pages/products";
import Sales from "./pages/sales";
import { Routes, Route } from "react-router-dom";
import Basket from "./pages/basket";
import Footer from "./components/footer";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
