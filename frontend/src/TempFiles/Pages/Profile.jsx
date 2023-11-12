import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NewNavbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { IF, URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/users/" + user._id, {
        withCredentials: true,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/posts/user/" + user._id, {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) fetchProfile();
  }, [param, user]);

  useEffect(() => {
    if (user) fetchUserPosts();
  }, [param, user]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:space-x-8">
          <div className="md:w-1/4 w-full mb-4 md:mb-0">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Profile</h2>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="w-full px-4 py-2 mb-4 border rounded-lg"
                placeholder="Your username"
                type="text"
              />
              {/* <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-4 py-2 mb-4 border rounded-lg"
                placeholder="Your email"
                type="email"
              /> */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleUserUpdate}
                  className="w-1/2 text-white font-semibold bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={handleUserDelete}
                  className="w-1/2 text-white font-semibold bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
              {updated && (
                <p className="text-green-500 text-center mt-4">
                  User updated successfully!
                </p>
              )}
            </div>
          </div>
          <div className="md:w-3/4 w-full">
            <h1 className="text-2xl font-semibold mb-4">Your Posts</h1>
            {posts?.map((p) => (
              <>
                <Link to={user ? `/posts/post/${p._id}` : "/login"}>
                  <ProfilePosts key={p._id} p={p} />
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

// import { useContext, useEffect, useState } from "react";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import ProfilePosts from "../components/ProfilePosts";
// import axios from "axios";
// import { IF, URL } from "../url";
// import { UserContext } from "../context/UserContext";
// import { useNavigate, useParams } from "react-router-dom";

// const Profile = () => {
//   const param = useParams().id;
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { user, setUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [updated, setUpdated] = useState(false);

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(URL + "/users/" + user._id, {
//         withCredentials: true,
//       });
//       setUsername(res.data.username);
//       setEmail(res.data.email);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleUserUpdate = async () => {
//     setUpdated(false);
//     try {
//       const res = await axios.put(
//         URL + "/users/" + user._id,
//         { username, email, password },
//         { withCredentials: true }
//       );
//       setUpdated(true);
//     } catch (err) {
//       console.log(err);
//       setUpdated(false);
//     }
//   };

//   const handleUserDelete = async () => {
//     try {
//       const res = await axios.delete(URL + "/users/" + user._id, {
//         withCredentials: true,
//       });
//       setUser(null);
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchUserPosts = async () => {
//     try {
//       const res = await axios.get(URL + "/posts/user/" + user._id);
//       setPosts(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, [param]);

//   useEffect(() => {
//     fetchUserPosts();
//   }, [param]);

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
//         <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:space-x-8">
//           <div className="md:w-3/4 w-full">
//             <h1 className="text-2xl font-semibold mb-4">Your Posts</h1>
//             {posts?.map((p) => (
//               <ProfilePosts key={p._id} p={p} />
//             ))}
//           </div>
//           <div className="md:w-1/4 w-full mt-4 md:mt-0">
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold mb-4">Profile</h2>
//               <input
//                 onChange={(e) => setUsername(e.target.value)}
//                 value={username}
//                 className="w-full px-4 py-2 mb-4 border rounded-lg"
//                 placeholder="Your username"
//                 type="text"
//               />
//               <input
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 className="w-full px-4 py-2 mb-4 border rounded-lg"
//                 placeholder="Your email"
//                 type="email"
//               />
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={handleUserUpdate}
//                   className="w-1/2 text-white font-semibold bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={handleUserDelete}
//                   className="w-1/2 text-white font-semibold bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//               {updated && (
//                 <p className="text-green-500 text-center mt-4">
//                   User updated successfully!
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Profile;
