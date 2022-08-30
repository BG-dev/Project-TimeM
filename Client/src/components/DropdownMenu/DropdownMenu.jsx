import React, { useState } from "react";
import "./DropdownMenu.scss";

function DropdownMenu({ options }) {
  const [active, setActive] = useState(false);

  return (
    <div className="dropdown">
      <i
        className="bx bx-dots-horizontal-rounded icon"
        onClick={() => setActive((prev) => !prev)}
      ></i>
      {active && (
        <div className="dropdown__menu">
          <ul className="dropdown__list">
            {options &&
              options.map((option, index) => (
                <li
                  key={`${index}-${option.text}`}
                  className="dropdown__item"
                  onClick={() => option.action()}
                >
                  <i className={`bx icon ${option.icon}`}></i>
                  <span className="dropdown__item-text">{option.text}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
