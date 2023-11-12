import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(URL + "/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(URL + "/users/" + user._id, { withCredentials: true });
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-800 w-48 md:w-64 rounded-lg p-4 text-white absolute top-12 right-0 md:right-16 z-10 transform hover:scale-105 transition-transform">
      {!user && (
        <h3 className="text-lg hover:text-gray-400 cursor-pointer">
          <Link to="/login">Login</Link>
        </h3>
      )}
      {!user && (
        <h3 className="text-lg hover:text-gray-400 cursor-pointer">
          <Link to="/register">Register</Link>
        </h3>
      )}
      {user && (
        <Link to={"/profile/" + user._id}>
          <h1 className="text-lg hover:text-gray-400 cursor-pointer">
            Profile
          </h1>
        </Link>
      )}
      {user && (
        <h3 className="text-lg hover:text-gray-400 cursor-pointer">
          <Link to={"/profile/edit/" + user._id}>Edit Profile</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-lg hover:text-gray-400 cursor-pointer">
          <Link to="/write">Write</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-lg hover:text-gray-400 cursor-pointer">
          <Link to={"/myblogs/" + user._id}>My blogs</Link>
        </h3>
      )}
      {user && (
        <h3
          onClick={handleLogout}
          className="text-lg hover:text-gray-400 cursor-pointer"
        >
          Logout
        </h3>
      )}
      {user && (
        <h3
          onClick={handleDelete}
          className="text-lg hover:text-gray-400 cursor-pointer"
        >
          Delete Account
        </h3>
      )}
    </div>
  );
};

export default Menu;
