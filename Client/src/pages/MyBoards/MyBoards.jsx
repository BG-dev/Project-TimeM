import React from "react";
import { BoardCard } from "../../components";
import { Link } from "react-router-dom";

import "./MyBoards.scss";

function MyBoards() {
  const boards = [];
  // const [boards, setBoards] = useState(null);

  // if (loading) return <h1>Loading...</h1>;
  return (
    <div className="boards">
      <ul className="boards__list">
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

export default MyBoards;
