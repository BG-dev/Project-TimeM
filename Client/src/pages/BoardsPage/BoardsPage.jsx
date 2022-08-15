import React, { useEffect, useState } from "react";
import {
  BoardCard,
  NewBoardCard,
  Modal,
  AddNewBoardForm,
} from "../../components";
import boardApi from "../../api/boardApi";
import { Link } from "react-router-dom";
import "./BoardsPage.scss";

function BoardsPage() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState([]);

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
          {boards &&
            boards.map((board) => (
              <li className="boards__list-item" key={board._id}>
                <Link to={`/board/${board._id}`}>
                  <BoardCard board={board} />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default BoardsPage;
