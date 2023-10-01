import React from "react";
import ITag from "../../types/tag";
import "./Tag.scss";

interface ITagProps {
  tag: ITag;
}

function Tag({ tag }: ITagProps) {
  const bgColor = `#${tag.color}`;
  return (
    <li className="tag" style={{ backgroundColor: bgColor }}>
      <span className="tag__text">{`#${tag.text}`}</span>
    </li>
  );
}

export default Tag;
