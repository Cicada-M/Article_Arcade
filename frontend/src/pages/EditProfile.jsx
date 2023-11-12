import { useState } from "react";
import Navbar from "../components/NewNavbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { useParams } from "react-router-dom";
const EditProfilePage = () => {
  const userId = useParams().id;

  const [updated, setUpdated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    city: "",
    country: "",
    bio: "",
    desg: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profileImage) {
      const data = new FormData();
      const filename = Date.now() + profileImage.name;
      data.append("img", filename);
      data.append("file", profileImage);
      formData.photo = filename;

      //image upload

      try {
        const imgUpload = await axios.post(URL + "/upload", data);
        console.log(imgUpload.data);
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(formData);
    for (const key in formData) {
      if (formData[key] === "") delete formData[key];
    }
    // console.log(formData);
    //profile update
    try {
      const res = await axios.put(
        URL + "/users/" + userId,
        { formData },
        {
          withCredentials: true,
        }
      );
      setUpdated(true);
      setTimeout(() => {
        setUpdated(false);
      }, 2000);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto mt-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-gray-100 rounded-lg p-6 shadow-md">
        <h1 className="text-3xl font-extrabold text-center mb-6">
          Edit Profile
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="desg"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Profession
            </label>
            <input
              type="text"
              id="desg"
              name="desg"
              value={formData.desg}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {profileImage && (
            <img
              src={window.URL.createObjectURL(profileImage)}
              alt="Profile Preview"
              className="w-100 h-100 rounded-sm mx-auto mb-4"
            />
          )}
          <button
            type="submit"
            className="bg-black text-white p-3 rounded hover:bg-gray-800 w-full"
          >
            Save Changes
          </button>
          {updated && (
            <p className="text-green-500 text-center mt-4">
              User updated successfully!
            </p>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditProfilePage;
