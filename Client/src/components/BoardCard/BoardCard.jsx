import React from "react";
import useDate from "../../hooks/date.hook";

import "./BoardCard.scss";

function BoardCard({ board }) {
  const color = board.color.value;
  const date = useDate(board.createdAt);

  return (
    <div className="board-card">
      <div
        style={{ backgroundColor: color }}
        className="board-card__image"
      ></div>
      <div className="board-card__content">
        <span className="board-card__title text">{board.name}</span>
        <div className="board-card__info">
          <div className="board-card__author">
            <div className="board-card__avatar"></div>
            <p className="text">{board.creator.username}</p>
          </div>
          <p className="board-card__date text">{date}</p>
        </div>
      </div>
    </div>
  );
}

export default BoardCard;
