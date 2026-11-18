
import { Link } from "react-router-dom";

function Navbar({ cartCount, onToggleCart }) {
  return (
    <header className="site-header">
      <nav className="navbar">
        <Link to="/" className="brand">
          VINYLVAULT
        </Link>

        <div className="nav-actions">
          {/* <Link to="/">Browse Records</Link> */}

          <button
            type="button"
            onClick={onToggleCart}
            className="cart-toggle"
          >
            Cart ({cartCount})
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
