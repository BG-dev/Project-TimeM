import React from "react";
import "./BoardHeader.scss";

function BoardHeader({ setIsDeleteModalActive }) {
  return (
    <div className="board-header">
      <div className="board-menu">
        <button className="btn btn-gray">Edit</button>
        <button
          className="btn btn-red"
          onClick={() => setIsDeleteModalActive((prev) => !prev)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BoardHeader;
