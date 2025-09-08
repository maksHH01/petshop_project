import "./App.css";
import Header from "./components/header";
import Main from "./pages/main/index";
import Products from "./pages/products";
import Sales from "./pages/sales";
import Basket from "./pages/basket";
import Footer from "./components/footer";
import ScrollToTop from "./components/scrollTop";

import { Routes, Route } from "react-router-dom";
import PageLayout from "./components/pagesLayout";
import CategoriesPage from "./pages/categories";
import ProductPage from "./pages/productPage";

function App() {
  return (
    <div className="container">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/categories" element={<PageLayout />}>
          <Route index element={<CategoriesPage />} />
          <Route path=":id" element={<CategoriesPage />} />
        </Route>
        <Route
          path="/products"
          element={
            <PageLayout dynamicBreadcrumbs={[{ label: "All Products" }]} />
          }
        >
          <Route index element={<Products />} />
        </Route>
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/sales" element={<Sales />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
