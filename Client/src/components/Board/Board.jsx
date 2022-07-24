import React from "react";
// import CardsList from "../CardsList/CardsList";
// import { useHttp } from "../../hooks/http.hook";

import "./Board.scss";

function Board({ board }) {
  // const { loading, request } = useHttp();
  // const [boardLists, setBoardLists] = useState(null);

  // const getBoard = useCallback(async () => {
  //   try {
  //     const fetched = await request(`/boards/${board.id}/lists`);
  //     setBoardLists(fetched.boardLists);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [board.id]);

  // useEffect(() => {
  //   getBoard();
  // }, [getBoard]);

  // if (loading) return <h1>Loading...</h1>;

  return (
    <div className="board">
      <h1 className="board__name">{board && board.name}</h1>
      {/* {boardLists && (
        <ul className="board__lists">
          {boardLists.map((boardList) => (
            <li id={`${boardList.name}-list`} key={boardList.id}>
              <CardsList list={boardList} boardId={board.id} />
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default Board;
