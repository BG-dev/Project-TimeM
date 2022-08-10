import React from "react";
import { useState } from "react";
import "./StatusList.scss";

function StatusList() {
  const [tasks, setTasks] = useState({});
  return (
    <div className="status-list">
      {tasks && tasks.map((task) => <p>{task}</p>)}
    </div>
  );
}

export default StatusList;
