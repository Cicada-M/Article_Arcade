/* eslint-disable react/prop-types */
import React from "react";

const ShowMessage = ({ message, type }) => {
  return (
    <>
      {type === "error" && <h3 className="text-red-500 text-sm ">{message}</h3>}
      {type === "success" && (
        <h3 className="text-green-500 text-sm ">{message}</h3>
      )}
    </>
  );
};

export default ShowMessage;
