import React, { useEffect } from "react";
import useRequest from "../../hooks/request.hook";
import { useParams } from "react-router-dom";
import "./BoardPage.scss";
import TasksList from "../../components/TasksList";

function BoardPage() {
  const { id } = useParams();
  const {
    data: { board },
    request: getBoardRequest,
  } = useRequest();

  useEffect(() => {
    getBoardRequest("get", `/boards/getboard/${id}`);
  }, []);

  return (
    <div className="lists">
      {board &&
        board.tasks.map((tasksList, index) => (
          <TasksList
            key={`${index}-${tasksList.status}`}
            status={tasksList.status}
            tasks={tasksList.tasks}
          />
        ))}
    </div>
  );
}

export default BoardPage;
