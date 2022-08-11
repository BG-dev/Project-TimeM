import React, { useEffect } from "react";
import useRequest from "../../hooks/request.hook";
import { useParams } from "react-router-dom";
import "./BoardPage.scss";
import TasksList from "../../components/TasksList";

function BoardPage() {
  const statuses = [
    {
      name: "TO DO",
      status: "todo",
    },
    {
      name: "DOING",
      status: "doing",
    },
    {
      name: "DONE",
      status: "done",
    },
  ];

  const { id } = useParams();
  const {
    data: { board },
    request: getBoardRequest,
  } = useRequest();

  const {
    data: { tasks },
    request: getBoardTasksRequest,
  } = useRequest();

  const splitTasksByStatus = (tasks) => {};

  useEffect(() => {
    getBoardRequest("get", `/boards/getboard/${id}`);
  }, []);

  useEffect(() => {
    if (board) getBoardTasksRequest("get", `/tasks/getboardtasks/${board._id}`);
  }, [board]);

  return <TasksList status={"TO DO"} tasks={tasks} />;
}

export default BoardPage;
