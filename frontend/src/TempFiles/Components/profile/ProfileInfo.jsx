// src/components/ProfileInfo.js
import { IF } from "../../url";
const ProfileInfo = () => {
  return (
    <div className="mx-auto w-full sm:w-2/3 lg:w-1/2 flex flex-col items-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105">
      <div className="mb-4">
        <img
          src={IF + "1698678122370header_essay-gettyimages-1315366028.avif"}
          alt="Profile Image"
          className="w-full object-cover rounded-lg"
        />
      </div>
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-700 mb-2">
          John Doe
        </h1>

        <p className="text-sm md:text-base text-gray-600">
          Email: <span className="text-md font-medium">johndoe@gmail.com</span>
        </p>
        <p className="text-sm md:text-base text-gray-600">
          From: <span className="text-md font-medium">Your Location</span>
        </p>
      </div>
      <hr className="border-t border-gray-300 my-4" />
      <p className="text-lg text-gray-700 text-center">
        Your bio goes here. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nullam nec libero auctor, pulvinar dui sit amet, vehicula elit.
        Fusce sit amet semper lorem.
      </p>
    </div>
  );
};

export default ProfileInfo;
