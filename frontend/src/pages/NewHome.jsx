// Home.js
import axios from "axios";
import Footer from "../components/Footer";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import HomePostCard from "../components/HomePostCard";
import Navbar from "../components/NewNavbar";
import "./NewHome.css";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  // console.log(user);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoader(true);
        const res = await axios.get(URL + "/posts/" + search);
        // console.log(res.data)
        setPosts(res.data);
        if (res.data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
        // console.log(res.data);
        setLoader(false);
      } catch (err) {
        console.log(err);
        setLoader(true);
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />

      {
        <div className="bg-white text-black min-h-screen">
          <div className="text-5xl font-black text-center py-8 transform hover:rotate-3 hover:scale-105 transition-transform">
            Blogs
          </div>
          <div className="my-styled-div">
            <p className="text-lg md:text-xl lg:text-2xl text-center mb-4 font-custom">
              Exploring philosophy, psychology, science, history, and the arts
              through fine writing.
            </p>
          </div>

          <main className="container mx-auto py-8 px-4">
            {loader ? (
              <div className="h-[40vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : !noResults ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <Link
                    to={user ? `/posts/post/${post._id}` : `/login`}
                    key={post.id}
                  >
                    <HomePostCard post={post} />
                  </Link>
                ))}
              </div>
            ) : (
              <h3 className="text-center font-bold mt-16">
                No Posts available
              </h3>
            )}
          </main>
        </div>
      }
      <Footer />
    </>
  );
};

export default Home;
