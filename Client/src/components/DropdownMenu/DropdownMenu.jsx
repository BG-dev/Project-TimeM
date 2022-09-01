import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./DropdownMenu.scss";

function DropdownMenu({ options }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  const menuRef = useRef();
  const btnRef = useRef();

  const handleClickOutside = (e) => {
    if (
      active &&
      !menuRef.current.contains(e.target) &&
      !btnRef.current.contains(e.target)
    ) {
      setActive(false);
    }
  };

  return (
    <div className="dropdown">
      <button
        className={`btn btn-icon btn-gray ${active ? "active" : ""} `}
        ref={btnRef}
        onClick={() => setActive((prev) => !prev)}
      >
        <i className="bx bx-dots-horizontal-rounded icon"></i>
      </button>
      {active && (
        <div ref={menuRef} className="dropdown__menu">
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
