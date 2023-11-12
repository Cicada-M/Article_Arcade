import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { UserContextProvider } from "./context/UserContext";
import MyBlogs from "./pages/MyBlogs";
import NewHome from "./pages/NewHome";
import NewProfile from "./pages/NewProfile";
import EditProfile from "./pages/EditProfile";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<NewHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<CreatePost />} />
        <Route path="/posts/post/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/myblogs/:id" element={<MyBlogs />} />
        <Route path="/profile/:id" element={<NewProfile />} />
        <Route path="/profile/edit/:id" element={<EditProfile />} />
      </Routes>
    </UserContextProvider>
  );
};

export default App;
