import React from "react";
import { BoardCard, NewBoardCard } from "../../components";
import { Link } from "react-router-dom";

import "./BoardsPage.scss";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function BoardsPage() {
  const [boards, setBoards] = useState([]);
  const { token } = useContext(AuthContext);
  console.log(token);
  useEffect(() => {
    axios
      .get("/boards", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => setBoards(response.data.boards))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="boards">
      <ul className="boards__list">
        <NewBoardCard />
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
  );
}

export default BoardsPage;
