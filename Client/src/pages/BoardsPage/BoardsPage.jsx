import React, { useEffect, useState } from "react";
import {
  BoardCard,
  NewBoardCard,
  Modal,
  AddNewBoardForm,
} from "../../components";
import boardApi from "../../api/boardApi";
import "./BoardsPage.scss";

function BoardsPage() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState([]);

  const boardsList = boards.map((board) => (
    <BoardCard key={board._id} board={board} />
  ));

  useEffect(() => {
    async function getBoards() {
      setLoading(true);
      try {
        const response = await boardApi.getUserBoards();
        setBoards(response.boards);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getBoards();
  }, []);

  return (
    <>
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <AddNewBoardForm
          setBoards={setBoards}
          setActiveModal={setIsModalActive}
        />
      </Modal>
      <div className="boards">
        <ul className="boards__list">
          <NewBoardCard setActive={setIsModalActive} />
          {boards && boardsList}
        </ul>
      </div>
    </>
  );
}

export default BoardsPage;
