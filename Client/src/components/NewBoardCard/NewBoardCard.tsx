import React from 'react';

import './NewBoardCard.scss';

interface INewBoardCardProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function NewBoardCard({ setActive }: INewBoardCardProps) {
  return (
    <div className="new-board-card__container">
      <div className="new-board-card" onClick={() => setActive(true)}>
        <div className="wrapper">
          <i className="bx bx-plus-circle icon" />
          <span className="text">Add Board</span>
        </div>
      </div>
    </div>
  );
}

export default NewBoardCard;
