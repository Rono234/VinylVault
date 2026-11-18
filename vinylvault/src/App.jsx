
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import {ALBUMS} from "./data/albums";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add an album or increase its quantity.
  function onAddToCart(album) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === album.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === album.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  album.stock
                )
              }
            : item
        );
      }

      if (album.stock <= 0) return currentCart;

      return [...currentCart, { ...album, quantity: 1 }];
    });
  }

  function onIncrement(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + 1,
                item.stock
              )
            }
          : item
      )
    );
  }

  function onDecrement(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function onRemove(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  function onClearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onToggleCart={() => setIsCartOpen(true)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <CatalogPage
              albums={ALBUMS}
              onAddToCart={onAddToCart}
            />
          }
        />

        <Route
          path="/album/:albumId"
          element={
            <AlbumDetailPage
              albums={ALBUMS}
              onAddToCart={onAddToCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              cartSubtotal={cartSubtotal}
              onClearCart={onClearCart}
            />
          }
        />
      </Routes>

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        cartSubtotal={cartSubtotal}
        onClose={() => setIsCartOpen(false)}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
      />
    </>
  );
}

export default App;
