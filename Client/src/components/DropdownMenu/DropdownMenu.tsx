import React, { useState, useRef, useEffect } from "react";
import "./DropdownMenu.scss";

interface IDropdownMenuProps {
  options: {
    text: string;
    action: () => void;
    icon: string;
  }[];
}

function DropdownMenu({ options }: IDropdownMenuProps) {
  const [active, setActive] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClickItem = (action: () => void) => {
    setActive(false);
    action();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      active &&
      menuRef.current &&
      btnRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      !btnRef.current.contains(e.target as Node)
    ) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  return (
    <div className="dropdown">
      <button
        className={`btn btn-icon btn-gray ${active ? "active" : ""} `}
        type="button"
        ref={btnRef}
        onClick={() => setActive((prev) => !prev)}
      >
        <i className="bx bx-dots-horizontal-rounded icon" />
      </button>
      {active && (
        <div ref={menuRef} className="dropdown__menu">
          <ul className="dropdown__list">
            {options &&
              options.map((option, index) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${index}-${option.text}`}
                  className="dropdown__item"
                  onClick={() => handleClickItem(option.action)}
                >
                  <i className={`bx icon ${option.icon}`} />
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
