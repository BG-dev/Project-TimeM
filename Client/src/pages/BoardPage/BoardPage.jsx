import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BoardPage.scss";
import { TasksList, Modal, AddNewTaskForm } from "../../components";
import boardApi from "../../api/boardApi";

function BoardPage() {
  const { id } = useParams();
  const [isModalActive, setIsModalActive] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState(null);
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
  console.log(tasks);

  return (
    <div className="board">
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <AddNewTaskForm
          setActiveModal={setIsModalActive}
          setTasks={setTasks}
          tasks={tasks}
          status={newTaskStatus}
          boardId={id}
        />
      </Modal>
      <div className="lists">
        {tasks &&
          tasks.map((tasksList, index) => (
            <TasksList
              key={`${index}-${tasksList.status}`}
              status={tasksList.status}
              tasks={tasksList.tasks}
              setModalActive={setIsModalActive}
              setNewTaskStatus={setNewTaskStatus}
            />
          ))}
      </div>
    </div>
  );
}

export default BoardPage;
