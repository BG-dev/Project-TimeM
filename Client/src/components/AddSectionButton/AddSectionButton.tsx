import React from 'react';

interface AddSectionButtonProps {
  addNewSections: (title: string) => void;
}

function AddSectionButton({ addNewSections }: AddSectionButtonProps) {
  return (
    <div className="new-task-card" onClick={() => addNewSections}>
      <div className="wrapper">
        <i className="bx bx-plus-circle icon" />
        <span className="text">Add Section</span>
      </div>
    </div>
  );
}

export default AddSectionButton;
