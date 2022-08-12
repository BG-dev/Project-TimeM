import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BoardPage.scss";
import TasksList from "../../components/TasksList";
import boardApi from "../../api/boardApi";

function BoardPage() {
  const { id } = useParams();
  const [boardName, setBoardName] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getBoard() {
      setLoading(true);
      try {
        const response = await boardApi.getOne(id);
        setBoardName(response.board.name);
        setTasks(response.board.tasks);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getBoard();
  }, []);

  return (
    <div className="lists">
      {tasks &&
        tasks.map((tasksList, index) => (
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
