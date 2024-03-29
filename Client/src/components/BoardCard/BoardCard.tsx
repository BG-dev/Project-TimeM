import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import IBoard from '../../types/board';
import { dayMonthDateFormat } from '../../utils/dateFormats';
import './BoardCard.scss';

interface IBoardCardProps {
    board: IBoard;
}

function BoardCard({ board }: IBoardCardProps) {
    const color = board.color.value;

    return (
        board && (
            <div className="board-card__container">
                <Link to={`/board/${board.id}`}>
                    <div className="board-card">
                        <div style={{ backgroundColor: color }} className="board-card__image" />
                        <div className="board-card__content">
                            <span className="board-card__title text">{board.name}</span>
                            <div className="board-card__info">
                                <div className="board-card__author">
                                    <div className="board-card__avatar" />
                                    <p className="text">{board.authorName}</p>
                                </div>
                                <p className="board-card__date text">
                                    {dayjs(board.createdAt).format(dayMonthDateFormat)}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    );
}

export default BoardCard;
