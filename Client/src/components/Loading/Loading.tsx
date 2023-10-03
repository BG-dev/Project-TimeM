import React from "react";
import "./Loading.scss";
import { Spin } from "antd";

function Loading() {
  return (
    <div className="loader">
      <Spin size="large" />
    </div>
  );
}

export default Loading;
