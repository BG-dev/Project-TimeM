import React from "react";
import { Link } from "react-router-dom";
import useDate from "../../hooks/date.hook";

import "./BoardCard.scss";
import IBoard from "../../types/board";

interface IBoardCardProps {
    board: IBoard;
}

function BoardCard({ board }: IBoardCardProps) {
    const color = board.color.value;
    const date = useDate(board.createdAt);

    return (
        board && (
            <div className="board-card__container">
                <Link to={`/board/${board.id}`}>
                    <div className="board-card">
                        <div
                            style={{ backgroundColor: color }}
                            className="board-card__image"
                        ></div>
                        <div className="board-card__content">
                            <span className="board-card__title text">
                                {board.name}
                            </span>
                            <div className="board-card__info">
                                <div className="board-card__author">
                                    <div className="board-card__avatar"></div>
                                    <p className="text">{board.authorName}</p>
                                </div>
                                <p className="board-card__date text">{date}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    );
}

export default BoardCard;
