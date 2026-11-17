import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Catalog</Link>
      <Link to="/album/alb-01">Sample Album</Link>
      <Link to="/checkout">Checkout</Link>
    </nav>
  );
}

export default Navbar;
