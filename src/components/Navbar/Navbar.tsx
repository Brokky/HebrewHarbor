import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dictionary">Dictionary</NavLink>
      <NavLink to="/lesson">Lesson</NavLink>
    </nav>
  );
};

export default Navbar;
