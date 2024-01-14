import React from 'react';

import './ColorSelector.scss';

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
              key={color.name}
              style={{ backgroundColor: color.value }}
              className={`selector__color ${
                index === activeColor ? 'active' : ''
              }`}
              onClick={() => setActiveColor(index)}
            />
          ))}
      </ul>
    </div>
  );
}

export default ColorSelector;
