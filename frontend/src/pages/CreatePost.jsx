import { useState, useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NewNavbar";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextArea from "../components/TextArea";
const CreatePost = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [initialDesc, setInitialDesc] = useState("");
  const [descText, setDescText] = useState("");
  const [file, setFile] = useState(null);

  const addCategory = (e) => {
    e.preventDefault();
    if (cat) {
      setCats([...cats, cat]);
      setCat("");
    }
  };

  const deleteCategory = (i) => {
    const updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (title === "") return;
    if (desc === "") return;
    const post = {
      title,
      desc,
      descText,
      categories: cats,
      userId: user._id,
      createdBy: user._id,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      // Image upload
      try {
        const imgUpload = await axios.post(URL + "/upload", data);
        console.log(imgUpload.data);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(post);
    // Post upload
    try {
      const res = await axios.post(URL + "/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 mt-8">
        <h1 className="font-bold text-xl md:text-2xl">Create a Post</h1>

        <form className="mt-4 space-y-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            required={true}
            placeholder="Enter post title"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-gray-400"
          />

          {file && (
            <img
              src={window.URL.createObjectURL(file)}
              className="w-full mt-4"
              alt=""
            />
          )}
          <label
            htmlFor="file"
            className="block text-gray-700 text-sm font-semibold mt-2"
          >
            Upload an Image
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="file"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-gray-400"
          />

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-4">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-gray-400"
                placeholder="Enter post category"
                type="text"
              />
              <button
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex flex-wrap">
            {cats.map((cat, i) => (
              <div
                key={i}
                className="flex justify-center items-center space-x-2 bg-gray-200 px-2 py-1 rounded-md mb-2"
                // Add margin or padding to create space between category tags
                style={{ margin: "2px" }}
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

          {/* TextAreaElement */}
          <TextArea
            initialDesc={initialDesc}
            desc={desc}
            setDesc={setDesc}
            setDescText={setDescText}
          />

          <button
            onClick={handleCreate}
            className="bg-black text-white font-semibold px-4 py-2 text-lg md:text-xl w-full md:w-1/5 mx-auto"
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;

// import { useState, useContext } from "react";
// import Footer from "../components/Footer";
// import Navbar from "../components/NewNavbar";
// import { ImCross } from "react-icons/im";
// import { UserContext } from "../context/UserContext";
// import { URL } from "../url";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import TextArea from "../components/TextArea";
// const CreatePost = () => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [cat, setCat] = useState("");
//   const [cats, setCats] = useState([]);
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [file, setFile] = useState(null);

//   const addCategory = () => {
//     let updatedCats = [...cats];
//     if (cat) updatedCats.push(cat);
//     setCat("");
//     setCats(updatedCats);
//   };
//   const deleteCategory = (i) => {
//     let updatedCats = [...cats];
//     updatedCats.splice(i, 1);
//     setCats(updatedCats);
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     // console.log(file);
//     const post = {
//       title,
//       desc,
//       categories: cats,
//       userId: user._id,
//       createdBy: user._id,
//     };
//     if (file) {
//       const data = new FormData();
//       const filename = Date.now() + file.name;
//       data.append("img", filename);
//       data.append("file", file);
//       post.photo = filename;

//       //image upload

//       try {
//         const imgUpload = await axios.post(URL + "/upload", data);
//         console.log(imgUpload.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     //post upload
//     try {
//       const res = await axios.post(URL + "/posts/create", post, {
//         withCredentials: true,
//       });
//       // console.log(res.data);
//       navigate("/posts/post/" + res.data._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <Navbar />
//       <div className="px-6 md:px-[200px] mt-8">
//         {/* TITLE */}
//         <h1 className="font-bold md:text-2xl text-xl">Create Post Here</h1>

//         <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4 ">
//           <input
//             onChange={(e) => setTitle(e.target.value)}
//             type="text"
//             placeholder="Enter post title"
//             className="px-4 py-2 outline-none"
//           />
//           {/* IMAGE */}
//           {file && (
//             <img
//               src={window.URL.createObjectURL(file)}
//               className="w-full mt-8"
//               alt=""
//             />
//           )}
//           <input
//             onChange={(e) => setFile(e.target.files[0])}
//             type="file"
//             className="px-4"
//             accept="image/*"
//           />

//           {/* categories area */}
//           <div className="flex flex-col">
//             <div className="flex items-center space-x-4 md:space-x-8">
//               <input
//                 value={cat}
//                 onChange={(e) => setCat(e.target.value)}
//                 className="px-4 py-2 outline-none"
//                 placeholder="Enter post category"
//                 type="text"
//               />
//               <div
//                 onClick={addCategory}
//                 className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
//               >
//                 Add
//               </div>
//             </div>

//             {/* categories */}
//             <div className="flex px-4 mt-3">
//               {cats?.map((cat, i) => (
//                 <div
//                   key={i}
//                   className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
//                 >
//                   <p>{cat}</p>
//                   <p
//                     onClick={() => deleteCategory(i)}
//                     className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
//                   >
//                     <ImCross />
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* text area */}
//           {/* <textarea
//             onChange={(e) => setDesc(e.target.value)}
//             rows={15}
//             cols={30}
//             className="px-4 py-2 outline-none"
//             placeholder="Enter Post Description"
//           /> */}
//           <TextArea setDesc={setDesc} />
//           <button
//             onClick={handleCreate}
//             className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 text-lg md:text-xl"
//           >
//             Create
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CreatePost;
