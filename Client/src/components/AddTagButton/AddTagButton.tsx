import React, { useState, useRef, useEffect } from 'react';
import './AddTagButton.scss';
import colors from '../../service/tagColors';
import ITag from '../../types/tag';

const MIN_TEXT_LENGTH = 0;
const MAX_TEXT_LENGTH = 15;

interface IAddTagButtonProps {
  tags: ITag[];
  setTags?: React.Dispatch<React.SetStateAction<ITag[]>>;
}

function AddTagButton({ tags, setTags }: IAddTagButtonProps) {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [tagValue, setTagValue] = useState<string>('');
  const [tagColor, setTagColor] = useState<string>('');
  const ref = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (isEditable) ref.current?.focus();
  }, [isEditable]);

  useEffect(() => {
    setNewTagColor();
  }, []);

  const addTag = (text: string) => {
    if (text === '' || setTags === undefined) return;

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
    setTagValue('');
  };

  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagValue(e.target.value);
  };

  const handleClickInput = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const handleSaveInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const text = e.currentTarget.value;
    stopEditing();
    addTag(text);
  };

  return (
    <li
      className="add-tag"
      style={{ backgroundColor: `#${tagColor}` }}
      onClick={handleClickButton}
    >
      {isEditable ? (
        <input
          type="text"
          ref={ref}
          className="add-tag__input input"
          onClick={handleClickInput}
          value={tagValue}
          onChange={handleChangeTag}
          onBlur={stopEditing}
          onKeyDown={handleSaveInput}
        />
      ) : (
        <span className="tag__text">+</span>
      )}
    </li>
  );
}

export default AddTagButton;
