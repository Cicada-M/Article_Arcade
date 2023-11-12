/* eslint-disable react/prop-types */
import { IF } from "../url";

const NewProfilePost = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md transform transition-transform hover:scale-105 hover:rotate-3">
      <img
        src={IF + blog.photo}
        alt={blog.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 mb-2">
          {"by "}
          <span className="font-semibold">{blog.createdBy.username}</span>
          {" on "}
          <span className="font-semibold">
            {new Date(blog.updatedAt).toString().slice(0, 15)}
          </span>
          {" at "}
          <span className="font-semibold">
            {new Date(blog.updatedAt).toString().slice(16, 24)}
          </span>
        </p>
        <p className="text-gray-600 line-clamp-3">{blog.descText}</p>
      </div>
    </div>
  );
};

export default NewProfilePost;
