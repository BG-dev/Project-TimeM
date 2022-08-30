import React from "react";
import "./DropdownMenu.scss";

function DropdownMenu({ active, setActive, options }) {
  console.log(options);
  return (
    <div className="dropdown">
      <i
        className="bx bx-dots-horizontal-rounded icon"
        onClick={() => setActive(true)}
      ></i>
      <div
        className={active ? "dropdown__menu active" : "dropdown__menu"}
        onClick={() => setActive(false)}
      >
        <div
          className="dropdown__content"
          onClick={(event) => event.stopPropagation()}
        >
          <ul className="dropdown__list">
            {options &&
              options.map((option, index) => (
                <li
                  key={`${index}-${option.text}`}
                  className="dropdown__item"
                  onClick={() => option.action()}
                >
                  {option.text}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
