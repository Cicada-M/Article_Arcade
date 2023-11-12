import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/NewNavbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import MyBlogPostCard from "../components/MyBlogPostCard";
import Loader from "../components/Loader";

const MyBlogs = () => {
  const { search } = useLocation();
  console.log(useLocation());
  const navigate = useNavigate();
  // console.log(search);
  const para = useParams();
  console.log(para);
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  // console.log(user)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoader(true);
      try {
        const res = await axios.get(URL + `/posts/user/${user._id}` + search, {
          withCredentials: true,
        });
        // console.log(res.data)
        setPosts(res.data);
        if (res.data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
        setLoader(false);
      } catch (err) {
        console.log(err);
        setLoader(false);
        navigate("/");
      }
    };
    if (user) fetchPosts();
  }, [search, user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        <h1 className="text-2xl font-bold mt-6 mb-4">Your Posts</h1>
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link
              key={post._id}
              to={user ? `/posts/post/${post._id}` : "/login"}
            >
              <MyBlogPostCard post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
