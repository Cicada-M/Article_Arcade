/* eslint-disable react/prop-types */
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../url";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { TiTick } from "react-icons/ti";
const Comment = ({ c, comments, setComments }) => {
  console.log();
  const [edit, setEdit] = useState(true);
  const [comment, setComment] = useState(c.comment);
  const { user } = useContext(UserContext);

  const handleEdit = async () => {
    try {
      const res = await axios.put(
        URL + "/comments/" + c._id,
        { comment },
        { withCredentials: true }
      );
      setComment(res.data.comment);
      // window.location.reload();
    } catch (error) {
      console.log(error);
      setComment(c.comment);
    }
  };

  const handleEditClick = () => {
    if (!edit && comment) {
      handleEdit();
    } else setComment(c.comment);
    setEdit(!edit);
  };

  const deleteComment = async () => {
    try {
      await axios.delete(URL + "/comments/" + c._id, { withCredentials: true });
      const updatedComments = comments.filter(
        (comment) => c._id !== comment._id
      );
      setComments(updatedComments);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg mt-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c.createdBy.username}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p className="text-gray-500 text-sm">
            {new Date(c.updatedAt).toString().slice(0, 15)}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(c.updatedAt).toString().slice(16, 24)}
          </p>

          {user?._id === c.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p onClick={handleEditClick} className="cursor-pointer">
                {edit && <BiEdit />}
                {!edit && <TiTick />}
              </p>
              {edit && (
                <p onClick={deleteComment} className="cursor-pointer">
                  <MdDelete />
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {edit ? (
        <p className="px-2 mt-2 break-all">{comment}</p>
      ) : (
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="px-2 mt-2 outline-none bg-gray-300 w-full"
        />
      )}
    </div>
  );
};

export default Comment;
