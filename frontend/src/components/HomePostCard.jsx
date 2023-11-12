/* eslint-disable react/prop-types */
import { IF } from "../url";
const HomePostCard = ({ post }) => {
  return (
    <div className="p-2 w-auto h-104 bg-gray-100 rounded-md transform transition-transform hover:scale-105 hover:shadow-lg hover:z-10">
      <div className="w-full h-64 overflow-hidden">
        <img
          src={IF + post.photo}
          alt={post.photo}
          className="object-cover rounded-md object-center w-full h-full"
        />
      </div>
      <h2 className="text-lg font-bold mt-2 mb-2">{post.title}</h2>
      <div className="flex justify-between items-center text-sm mb-1">
        <span className="text-decoration-line: underline font-semibold hover:font-bold">
          @{post.createdBy.username}
        </span>
        <span className="font-medium hover:font-bold">
          {`${new Date(post.updatedAt).toString().slice(0, 15)} | ${new Date(
            post.updatedAt
          )
            .toString()
            .slice(16, 24)}`}
        </span>
      </div>
      <p className="text-md font-light overflow-ellipsis overflow-hidden h-24">
        {post.descText}
      </p>
    </div>
  );
};

export default HomePostCard;
