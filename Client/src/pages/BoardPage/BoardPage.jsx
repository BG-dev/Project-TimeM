import React, { useEffect } from "react";
import useRequest from "../../hooks/request.hook";
import { useParams } from "react-router-dom";
import "./BoardPage.scss";

function BoardPage() {
  const { id } = useParams();
  const {
    data: { board },
    request: getBoardRequest,
  } = useRequest();

  const {
    data: { tasks },
    request: getBoardTasksRequest,
  } = useRequest();

  useEffect(() => {
    getBoardRequest("get", `/boards/getboard/${id}`);
  }, []);

  useEffect(() => {
    if (board) getBoardTasksRequest("get", `/tasks/getboardtasks/${board._id}`);
  }, [board]);

  console.log(tasks);
  return <h1>Hello</h1>;
}

export default BoardPage;
