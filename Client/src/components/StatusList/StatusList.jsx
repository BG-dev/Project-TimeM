import React from "react";
import { useState } from "react";
import "./StatusList.scss";

function StatusList({ tasks }) {
  return (
    <div className="status-list">
      <span className="status-list__title">TO DO</span>
      {tasks && tasks.map((task) => <p>{task.text}</p>)}
    </div>
  );
}

export default StatusList;
