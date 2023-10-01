import React from "react";

import "./ColorSelector.scss";

interface IColorSelectorProps {
  activeColor: number;
  setActiveColor: React.Dispatch<React.SetStateAction<number>>;
  colors: {
    name: string;
    value: string;
  }[];
}

function ColorSelector({
  activeColor,
  setActiveColor,
  colors,
}: IColorSelectorProps) {
  return (
    <div className="selector">
      <ul className="selector__colors">
        {colors &&
          colors.map((color, index) => (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}-${color.name}`}
              style={{ backgroundColor: color.value }}
              className={`selector__color ${
                index === activeColor ? "active" : ""
              }`}
              onClick={() => setActiveColor(index)}
            />
          ))}
      </ul>
    </div>
  );
}

export default ColorSelector;
