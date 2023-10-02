import React, { ReactNode } from "react";
import { Button } from "antd";

interface ICustomButton {
  type?: "primary" | "default";
  children: ReactNode;
}

function CustomButton({ type, children }: ICustomButton) {
  return <Button type={type}>{children}</Button>;
}

export default CustomButton;
