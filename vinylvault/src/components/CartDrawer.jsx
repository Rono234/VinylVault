
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

function CartDrawer({
  isOpen,
  cart,
  cartSubtotal,
  onClose,
  onIncrement,
  onDecrement,
  onRemove
}) {
  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div
        className="cart-backdrop"
        onClick={onClose}
      />

      <aside
        className="cart-drawer"
        aria-label="Shopping cart"
      >
        <div className="cart-header">
          <h2>Your Cart</h2>

          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>

        {cart.length === 0 ? (
          <p>Your cart is currently empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onRemove={onRemove}
                />
              ))}
            </div>

            <div className="cart-footer">
              <h3>
                Subtotal: ${cartSubtotal.toFixed(2)}
              </h3>

              <Link
                to="/checkout"
                onClick={onClose}
                className="checkout-button"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
