import React, { useEffect, useState } from "react";
import {
  BoardCard,
  NewBoardCard,
  Modal,
  AddNewBoardForm,
} from "../../components";
import { Link } from "react-router-dom";
import "./BoardsPage.scss";
import useRequest from "../../hooks/request.hook";

function BoardsPage() {
  const [isModalActive, setIsModalActive] = useState(false);

  const {
    data: { boards },
    request,
  } = useRequest();
  useEffect(() => {
    request("get", "boards/getUserBoards");
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
