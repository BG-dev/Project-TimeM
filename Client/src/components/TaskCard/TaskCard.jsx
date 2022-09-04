import React, { useState, useContext } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { ConfirmForm, Modal } from "../../components";
import { BoardContext, BoardContextActions } from "../../context/BoardContext";
import taskApi from "../../api/taskApi";
import "./TaskCard.scss";

function TaskCard({
  task,
  list,
  onDragOverHandler,
  onDragLeaveHandler,
  onDragStartHandler,
  onDragEndHandler,
  onDropHandler,
}) {
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const { dispatch, lists } = useContext(BoardContext);

  const openDeleteModal = () => {
    setIsDeleteModalActive(true);
  };

  const deleteTask = async () => {
    try {
      await taskApi.delete(task._id);
      const newLists = [...lists];
      const listIndex = newLists.findIndex(
        (elem) => elem.status === list.status
      );
      const taskIndex = newLists[listIndex].tasks.findIndex(
        (elem) => elem._id === task._id
      );
      newLists[listIndex].tasks.splice(taskIndex, 1);
      dispatch(BoardContextActions.setLists(newLists));
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async () => {
    await taskApi.update(task._id);
  };

  const options = [
    {
      text: "Edit",
      action: editTask,
      icon: "bx-edit",
    },
    {
      text: "Remove",
      action: openDeleteModal,
      icon: "bx-trash",
    },
  ];

  return (
    <>
      <Modal active={isDeleteModalActive} setActive={setIsDeleteModalActive}>
        <ConfirmForm
          text={"Do you want to delete this task?"}
          confirmHandler={deleteTask}
          setActive={setIsDeleteModalActive}
        />
      </Modal>

      <div
        draggable={true}
        onDragOver={(e) => onDragOverHandler(e)}
        onDragLeave={(e) => onDragLeaveHandler(e)}
        onDragStart={(e) => onDragStartHandler(e, list, task)}
        onDragEnd={(e) => onDragEndHandler(e)}
        onDrop={(e) => onDropHandler(e, list, task)}
        className="task"
      >
        <div className="task__top">
          <span className="task-text">{task && task.text}</span>
          <DropdownMenu options={options} />
        </div>
      </div>
    </>
  );
}

export default TaskCard;
