import React from "react";

import "./NewBoardCard.scss";

function NewBoardCard() {
  return (
    <div className="new-board-card">
      <div className="wrapper">
        <i className="bx bx-plus-circle icon"></i>
        <span className="text">Add Board</span>
      </div>
    </div>
  );
}

export default NewBoardCard;
