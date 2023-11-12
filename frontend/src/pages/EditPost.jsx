import { useState, useEffect } from "react";
import { URL, IF } from "../url";
import Navbar from "../components/NewNavbar";
import Footer from "../components/Footer";
import TextArea from "../components/TextArea";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const EditPost = () => {
  const postId = useParams().id;
  const navigate = useNavigate();
  const [title, setTtile] = useState("");
  const [desc, setDesc] = useState("");
  const [descText, setDescText] = useState("");
  const [initialDesc, setInitialDesc] = useState("");
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(URL + "/posts/" + postId, {
          withCredentials: true,
        });
        console.log(res.data);
        setTtile(res.data.title);
        setInitialDesc(res.data.desc);
        setDesc(res.data.desc);
        setDescText(res.data.descText);
        setFileName(res.data.photo);
        setCats(res.data.categories);
      } catch (error) {
        console.log("error fetching post", error);
      }
    };
    fetchPost();
  }, [postId]);

  const addCategory = () => {
    let updatedCats = [...cats];
    if (cat) updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };
  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  //submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "") return;
    if (desc === "") return;
    const post = {
      title,
      desc,
      descText,
      categories: cats,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      //image upload

      try {
        const imgUpload = await axios.post(URL + "/upload", data);
        console.log(imgUpload.data);
      } catch (error) {
        console.log(error);
      }
    }

    //post upload
    console.log(post.desc);
    try {
      const res = await axios.put(URL + "/posts/" + postId, post, {
        withCredentials: true,
      });
      // console.log(res.data);
      navigate("/posts/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Update a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4 ">
          {/* title */}
          <input
            value={title}
            onChange={(e) => setTtile(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
          />
          {/* show image from server*/}
          {fileName && (
            <img src={IF + fileName} className="w-full mt-8" alt="" />
          )}

          {file && (
            <img
              src={window.URL.createObjectURL(file)}
              className="w-full mt-8"
              alt=""
            />
          )}

          {/* insert image */}
          <input
            onChange={(e) => {
              setFileName(null);
              setFile(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
            type="file"
            className="px-4"
          />

          {/* insert category */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((cat, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{cat}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* text area */}
          {/* <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none "
            placeholder="Enter Post Description"
          /> */}
          <TextArea
            desc={desc}
            initialDesc={initialDesc}
            setDesc={setDesc}
            setDescText={setDescText}
          />
          <button
            onClick={handleSubmit}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 text-lg md:text-xl"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
