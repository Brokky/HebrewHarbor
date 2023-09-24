import Navbar from "../Navbar/Navbar";
import "./Header.scss";

const Header = ({ title }: { title: string }) => {
  return (
    <header>
      <h1>{title}</h1>
      <Navbar />
    </header>
  );
};

export default Header;
