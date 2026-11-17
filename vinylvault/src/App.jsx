
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route
          path="/album/:albumId"
          element={<AlbumDetailPage />}
        />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;
