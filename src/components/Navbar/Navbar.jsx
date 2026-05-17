import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2>AXIPAYS</h2>

      <div className="nav-links">
        <Link to="/">Checkout</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}

export default Navbar;
