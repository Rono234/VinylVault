
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import { ALBUMS } from "./data/albums";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<CatalogPage albums={ALBUMS} />} />
        <Route
          path="/album/:albumId"
          element={<AlbumDetailPage albums={ALBUMS} />}
        />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;
