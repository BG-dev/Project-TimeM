import React, { useEffect } from "react";
import useRequest from "../../hooks/request.hook";
import { useParams } from "react-router-dom";
import "./BoardPage.scss";
import StatusList from "../../components/StatusList/StatusList";

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

  return <StatusList tasks={tasks} />;
}

export default BoardPage;
