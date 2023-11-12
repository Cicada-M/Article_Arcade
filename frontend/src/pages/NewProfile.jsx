import { useEffect, useState } from "react";
import Navbar from "../components/NewNavbar";
import Footer from "../components/Footer";
import { URL, IF } from "../url";
// import { UserContext } from "../context/UserContext";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NewProfilePost from "../components/NewProfilePost";

const ProfilePage = () => {
  // const { user } = useContext(UserContext);
  const userId = useParams().id;
  const [profile, setProfile] = useState({
    name: "Name",
    username: "Username",
    desg: "Profession",
    email: "example@example.com",
    city: "New York",
    country: "USA",
    bio: "Passionate blogger sharing my thoughts and experiences. I love exploring new places, meeting people, and writing about my adventuresexploring new places, meeting people, and writing about my adventure exploring new places, meeting people, and writing about my adventure",
    photo: "1698678281826header_essay-v1-blossom.avif",
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(URL + "/users/" + userId, {
          withCredentials: true,
        });
        setProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(URL + "/posts/user/" + userId, {
          withCredentials: true,
        });
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [userId]);

  // const blogs = [
  //   {
  //     id: 1,
  //     title: "My First Blog",
  //     description:
  //       "This is the description of my first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     username: "john_doe",
  //     date: "2023-11-01",
  //     time: "15:30",
  //     imageUrl: "blog1.jpg", // URL to the blog photo
  //   },
  //   {
  //     id: 2,
  //     title: "A Day in the Park",
  //     description:
  //       "Exploring the beauty of nature and enjoying a day in the park. This is a long description that should be truncated to fit within the card.",
  //     username: "nature_lover",
  //     date: "2023-10-25",
  //     time: "10:15",
  //     imageUrl: "blog2.jpg", // URL to the blog photo
  //   },
  // ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div
              className="md:col-span-1 bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
              style={{
                cursor: "pointer",
                backgroundImage: `url(${IF + profile.photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "10px",
                height: "300px", // You can adjust the height as needed
              }}
            ></div>

            <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="text-4xl font-semibold text-gray-800 mb-2">
                  {profile.name}
                </div>
                <div className="text-2xl text-gray-600 mb-4">
                  {profile.desg}
                </div>
                <div className="text-gray-600 mb-4">
                  <div className="text-lg">{profile.email}</div>
                  <div className="text-lg">{`${profile.city}, ${profile.country}`}</div>
                </div>
                <p className="text-gray-700 text-justify text-lg">
                  {profile.bio}
                </p>
                <p className="text-gray-700 text-justify mt-4 text-lg">
                  <strong>Connect with me:</strong> Find me on{" "}
                  <a href="#">Twitter</a> and <a href="#">LinkedIn</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10">
          <h2 className="text-5xl text-center font-semibold text-gray-800 mb-10 hover:text-indigo-500 transform hover:scale-105 transition duration-300">
            My Blogs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {posts.map((blog) => (
              <Link key={blog._id} to={"/posts/post/" + blog._id}>
                <NewProfilePost blog={blog} />
              </Link>
            ))}
          </div>
          {posts.length === 0 && (
            <p className="text-gray-600">No Blogs to Show</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;

// <div
//                 key={blog._id}
//                 className="bg-white rounded-lg shadow-md transform transition-transform hover:scale-105 hover:rotate-3"
//               >
//                 <img
//                   src={IF + blog.photo}
//                   alt={blog.title}
//                   className="w-full h-48 object-cover rounded-t-lg"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                     {blog.title}
//                   </h3>
//                   <p className="text-gray-600 mb-2">
//                     {"by "}
//                     <span className="font-semibold">
//                       {blog.createdBy.username}
//                     </span>
//                     {" on "}
//                     <span className="font-semibold">
//                       {new Date(blog.updatedAt).toString().slice(0, 15)}
//                     </span>
//                     {" at "}
//                     <span className="font-semibold">
//                       {new Date(blog.updatedAt).toString().slice(16, 24)}
//                     </span>
//                   </p>
//                   <p className="text-gray-600 line-clamp-3">{blog.desc}</p>
//                 </div>
//               </div>
