import React from "react";
import colors from "../../service/colors";
import useDate from "../../hooks/date.hook";

import "./BoardCard.scss";

function BoardCard({ board }) {
  const color = colors[board.color];
  const date = useDate(board.createdAt);

  return (
    <div className="board-card">
      <div style={{ backgroundColor: color }} className="board-card__image">
      </div>
      <div className="board-card__content">
        <span className="board-card__title">{board.name}</span>
        <div className="board-card__info">
          <div className="board-card__author">
            <div className="board-card__avatar"></div>
            <p>{board.author}</p>
          </div>
          <p className="board-card__date">{date}</p>
        </div>
      </div>
    </div>
  );
}

export default BoardCard;
