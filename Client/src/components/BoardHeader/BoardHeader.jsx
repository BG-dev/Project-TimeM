import React from "react";
import "./BoardHeader.scss";

function BoardHeader() {
  return (
    <div className="board-header">
      <div className="board-menu">
        <button className="btn btn-gray">Edit</button>
        <button className="btn btn-red">Delete</button>
      </div>
    </div>
  );
}

export default BoardHeader;
