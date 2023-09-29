import { useLocation, Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  let location = useLocation();

  return (
    <nav>
      {location.pathname !== "/HebrewHarbor/" && <Link to="/HebrewHarbor/">Home</Link>}
      {location.pathname !== "/dictionary" && (
        <Link to="/dictionary">Dictionary</Link>
      )}
      {location.pathname !== "/lesson" && <Link to="/lesson">Lesson</Link>}
    </nav>
  );
};

export default Navbar;
