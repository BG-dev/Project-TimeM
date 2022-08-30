import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./DropdownMenu.scss";

function DropdownMenu({ options }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const refBlock = useRef(null);

  const handleClickOutside = (e) => {
    if (!refBlock.current.contains(e.target)) {
      setActive(false);
    }
  };

  return (
    <div className="dropdown">
      <i
        className="bx bx-dots-horizontal-rounded icon"
        onClick={() => setActive((prev) => !prev)}
      ></i>
      {active && (
        <div ref={refBlock} className="dropdown__menu">
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
