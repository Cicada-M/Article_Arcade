import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./NewMenu";
import { UserContext } from "../context/UserContext";
import "./NewNavbar.css";
// import NotificationContainer from "./NotificationContainer";
const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  // console.log(prompt)

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      {/* LOGO */}
      <h1 className="text-lg md:text-xl hover:scale-110 font-extrabold animate-futuristic">
        <Link to="/">Article Arcade</Link>
      </h1>

      {/* SEARCH BAR */}
      {(path === "/" || path === "/myblogs/" + user?._id) && (
        <div className="flex justify-center items-center space-x-0">
          <p
            onClick={() => navigate(prompt ? "?search=" + prompt : path)}
            className="cursor-pointer"
          >
            <BsSearch />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                navigate(prompt ? "?search=" + prompt : path);
              }
            }}
            className="outline-none px-3 "
            placeholder="Search a post"
            type="text"
          />
        </div>
      )}
      {/* OTHER FUNC */}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {/* {user && <NotificationContainer />} */}
        {user && (
          <div className="bg-gray-200 text-black p-2 rounded-full hover:bg-gray-300 hover:shadow-md transform hover:scale-105 transition-transform">
            {user.username}
          </div>
        )}
        {user ? (
          <h3 className="hover:scale-110 hover:font-bold">
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div className="md:hidden">
        <p onClick={showMenu} className="cursor-pointer">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
