import { useLocation } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  let location = useLocation();

  return (
    <nav>
      {location.pathname !== "/" && <a href="/">Home</a>}
      {location.pathname !== "/dictionary" && (
        <a href="/dictionary">Dictionary</a>
      )}
      {location.pathname !== "/lesson" && <a href="/lesson">Lesson</a>}
    </nav>
  );
};

export default Navbar;
