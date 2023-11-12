import Footer from "../components/Footer";
import Navbar from "../components/NewNavbar";
import Comment from "../components/Comment";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Loader from "../components/Loader";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { URL, IF } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import parse from "html-react-parser";
const PostDetails = () => {
  const postId = useParams().id;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState({});
  const [loader, setLoader] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // console.log(user);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setNoResults(true);
        // setLoader(true);
        const res = await axios.get(URL + "/posts/" + postId, {
          withCredentials: true,
        });
        console.log(res.data.desc);
        setPost(res.data);
        setNoResults(false);
        setLoader(false);
        // console.log(res.data);
      } catch (err) {
        setLoader(false);
        console.log(err);
      }
    };
    fetchPostDetails();
  }, [postId, comments]);

  //get all comments
  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const res = await axios.get(URL + "/comments/post/" + postId);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostComments();
  }, [postId]);

  //Delete Post handler
  const handleDeletePost = async () => {
    try {
      await axios.delete(URL + "/posts/" + postId, { withCredentials: true });
      console.log("post deleted successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //create comment handler
  const postComment = async (e) => {
    e.preventDefault();
    try {
      if (comment === "") return;
      const res = await axios.post(
        URL + "/comments/create",
        {
          comment: comment,
          postId: postId,
          userId: user._id,
          createdBy: user._id,
        },
        { withCredentials: true }
      );

      setComment("");
      setComments([...comments, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : !noResults ? (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl text-bold md:text-3xl">{post.title}</h1>
            {user?._id === post.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p>
                  <BiEdit
                    className="cursor-pointer text-2xl"
                    onClick={() => {
                      navigate("/edit/" + postId);
                    }}
                  />
                </p>
                <p
                  className="cursor-pointer text-2xl"
                  onClick={handleDeletePost}
                >
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <Link to={"/profile/" + post.userId} className="">
              <p>@{post.createdBy.username}</p>
            </Link>
            <div className="flex space-x-2 text-sm">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          {/* IMAGE */}
          <img src={IF + post.photo} className="w-full mt-8" alt={post.title} />

          <div className="mx-auto mt-8 text-lg">{parse(post.desc)}</div>

          {/* {post.desc} */}

          {/* categories */}
          <div className="flex flex-col md:flex-row items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center flex-wrap items-center space-x-2">
              {post.categories?.map((category, i) => (
                <div key={i} className="bg-gray-300 mb-2 rounded-lg px-3 py-1 ">
                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* <div className="container flex flex-wrap">
            <h3 className="w-full">Categories</h3>
            {post.categories.map((category, index) => (
              <div key={index} className="w-1/2 md:w-1/4 lg:w-1/6 p-2">
                <div key={index} className="bg-gray-300 rounded-lg px-3 py-1 ">
                  {category}
                </div>
              </div>
            ))}
          </div> */}

          {/* comment */}
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-bold">Comments</h3>

            {comments?.map((c) => (
              <Comment
                key={c._id}
                c={c}
                comments={comments}
                setComments={setComments}
                post={post}
              />
            ))}

            {/* write a comment */}
            <div className="w-full flex flex-col mt-4 md:flex-row">
              <input
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                type="text"
                placeholder="Write a comment"
                className="md:w-[80%] outline-none px-4 py-2 mt-4 md:mt-0"
              />

              {/* comment submit button */}
              <button
                onClick={postComment}
                className="bg-black text-sm text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center px-8 md:px-[200px] min-h-[80vh]">
          <h3 className="text-center font-bold">No Post available</h3>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
