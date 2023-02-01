import React from "react";

import "./ColorSelector.scss";

function ColorSelector({ activeColor, setActiveColor, colors }) {
  return (
    <div className="selector">
      <ul className="selector__colors">
        {colors &&
          colors.map((color, index) => (
            <li
              key={index}
              style={{ backgroundColor: color }}
              className={`selector__color ${
                index === activeColor ? "active" : ""
              }`}
              onClick={() => setActiveColor(index)}
            ></li>
          ))}
      </ul>
    </div>
  );
}

export default ColorSelector;
