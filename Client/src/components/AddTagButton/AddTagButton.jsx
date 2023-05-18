import React, { useContext, useState, useRef, useEffect } from "react";
import "./AddTagButton.scss";
import { colors } from "../../service/tagColors";

const MIN_TEXT_LENGTH = 0;
const MAX_TEXT_LENGTH = 15;

const AddTagButton = ({ tags, setTags }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [tagValue, setTagValue] = useState("");
  const [tagColor, setTagColor] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (isEditable) ref.current?.focus();
  }, [isEditable]);

  useEffect(() => {
    setNewTagColor();
  }, [tags]);

  const getRandomColor = () => {
    let number = Math.floor(Math.random() * colors.length);

    if (tags.length !== 0) {
      const lastTagColor = tags[tags.length - 1].color;
      while (colors[number] === lastTagColor) {
        number = Math.floor(Math.random() * colors.length);
      }
    }

    return colors[number];
  };

  const setNewTagColor = () => {
    const color = getRandomColor();
    setTagColor(color);
  };

  const addTag = (text) => {
    if (text === "") return;

    const tag = { text, color: tagColor };
    if (text.length > MIN_TEXT_LENGTH && text.length <= MAX_TEXT_LENGTH) {
      const newTagsList = [...tags, tag];
      setTags(newTagsList);
    }
  };

  const handleClickButton = () => {
    setIsEditable(true);
  };

  const stopEditing = () => {
    setIsEditable(false);
    setTagValue("");
  };

  const handleChangeTag = (e) => {
    setTagValue(e.target.value);
  };

  const handleClickInput = (e) => {
    e.stopPropagation();
  };

  const handleSaveInput = (e) => {
    if (e.key !== "Enter") return;
    const text = e.currentTarget.value;
    stopEditing();
    addTag(text);
  };

  return (
    <li
      className={"add-tag"}
      style={{ backgroundColor: `#${tagColor}` }}
      onClick={handleClickButton}
    >
      {isEditable ? (
        <input
          type="text"
          ref={ref}
          className={"add-tag__input input"}
          onClick={(e) => handleClickInput(e)}
          value={tagValue}
          onChange={handleChangeTag}
          onBlur={stopEditing}
          onKeyDown={handleSaveInput}
        />
      ) : (
        <span className="tag__text">{"+"}</span>
      )}
    </li>
  );
};

export default AddTagButton;
