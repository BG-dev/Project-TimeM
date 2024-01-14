import React, { useEffect, useState } from 'react';
import {
  BoardCard,
  NewBoardCard,
  Modal,
  AddBoardForm,
  Loading,
} from '../../components';
import boardApi from '../../api/boardApi';
import IBoard from '../../types/board';
import './BoardsPage.scss';

function BoardsPage() {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [boards, setBoards] = useState<IBoard[]>([]);

  useEffect(() => {
    async function getBoards() {
      setLoading(true);
      try {
        const response = await boardApi.getUserBoards();
        const userBoards = response.data.boards;
        setBoards(userBoards);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getBoards();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <AddBoardForm setBoards={setBoards} setActiveModal={setIsModalActive} />
      </Modal>
      <div className="boards">
        <ul className="boards__list">
          <NewBoardCard setActive={setIsModalActive} />
          {boards.length &&
            boards.map((board: IBoard) => (
              <BoardCard key={board.id} board={board} />
            ))}
        </ul>
      </div>
    </>
  );
}

export default BoardsPage;
