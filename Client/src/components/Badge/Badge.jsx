import React from "react";

import "./Badge.scss";

function Badge({ color, onClick, isActive }) {
  return (
    <i
      onClick={onClick}
      className={`badge color-${color} ${isActive ? "active" : ""}`}
    ></i>
  );
}

export default Badge;
