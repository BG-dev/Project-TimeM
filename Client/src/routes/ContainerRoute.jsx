import React from "react";
import { Outlet } from "react-router-dom";

export default function ContainerRoute() {
  return (
    <div className="container">
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
