import React, { ReactElement } from "react";

import "./Modal.scss";

interface IModalProps {
    active: boolean;
    children: ReactElement;
    setActive(isActive: boolean): void;
}

function Modal({ active, setActive, children }: IModalProps) {
    return (
        <div
            className={active ? "modal active" : "modal"}
            onClick={() => setActive(false)}
        >
            <div
                className="modal__content"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="btn btn-icon close-icon"
                    onClick={() => setActive(false)}
                >
                    <i className="bx bx-x icon "></i>
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
