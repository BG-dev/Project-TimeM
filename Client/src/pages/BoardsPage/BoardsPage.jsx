import React from "react";
import {
  BoardCard,
  NewBoardCard,
  Modal,
  AddNewBoardForm,
} from "../../components";
import { Link } from "react-router-dom";
import "./BoardsPage.scss";
import { useEffect } from "react";
import { useState } from "react";
import useRequest from "../../hooks/request.hook";

function BoardsPage() {
  const [isModalActive, setIsModalActive] = useState(false);

  const {
    loading,
    data: { boards },
    request,
  } = useRequest("get", "boards/getUserBoards");
  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <AddNewBoardForm
          getBoardsRequest={request}
          setActiveModal={setIsModalActive}
        />
      </Modal>
      <div className="boards">
        <ul className="boards__list">
          <NewBoardCard setActive={setIsModalActive} />
          {boards &&
            boards.map((board) => (
              <li className="boards__list-item" key={board._id}>
                <Link to={`/boards/${board._id}`}>
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
