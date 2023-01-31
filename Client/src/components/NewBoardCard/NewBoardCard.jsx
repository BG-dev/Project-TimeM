import React from "react";

import "./NewBoardCard.scss";

function NewBoardCard({ setActive }) {
  return (
    <div className="new-board-card__container">
      <div className="new-board-card" onClick={() => setActive(true)}>
        <div className="wrapper">
          <i className="bx bx-plus-circle icon"></i>
          <span className="text">Add Board</span>
        </div>
      </div>
    </div>
  );
}

export default NewBoardCard;
