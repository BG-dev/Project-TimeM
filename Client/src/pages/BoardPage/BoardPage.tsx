import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { setBoard } from "../../redux/features/boardSlice";
import "./BoardPage.scss";
import {
  Section,
  Modal,
  AddTaskForm,
  ConfirmForm,
  EditBoardForm,
  Loading,
} from "../../components";
import boardApi from "../../api/boardApi";
import taskApi from "../../api/taskApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ISection from "../../types/section";
import ITask from "../../types/task";
import IBoard from "../../types/board";
import IDragAndDropMethods from "../../types/dnd";
import { useAlert } from "../../hooks/alert.hook";
import { useServerError } from "../../hooks/serverError.hook";

function BoardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const board: IBoard | null = useAppSelector((state) => state.board.value);
  const [isEditBoardModalActive, setIsEditBoardModalActive] =
    useState<boolean>(false);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isDeleteModalActive, setIsDeleteModalActive] =
    useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<ISection | null>(null);
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);
  const [newTaskSection, setNewTaskSection] = useState<ISection | null>(null);
  const { setAlertState } = useAlert();
  const { handleServerError } = useServerError();

  async function updateTaskPosition(updatingData: {
    resourceSection: ISection;
    destinationSection: ISection;
  }) {
    try {
      await taskApi.updatePosition(updatingData);
    } catch (err) {
      console.log(err);
    }
  }

  function onDragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    // if (e.target.className === "task")
    //     e.target.style.boxShadow = "0 2px 3px black";
  }

  function onDragLeaveHandler() {
    // e.target.style.boxShadow = "none";
  }

  function onDragStartHandler(section: ISection, task: ITask) {
    setCurrentSection(section);
    setCurrentTask(task);
  }

  function onDragEndHandler() {
    // e.target.style.boxShadow = "none";
  }

  function onDropHandler(
    e: React.DragEvent<HTMLDivElement>,
    destinationSection: ISection,
    destinationTask: ITask,
  ) {
    e.preventDefault();
    e.stopPropagation();
    if (!board) return;
    const updatedSections: ISection[] = JSON.parse(
      JSON.stringify(board.sections),
    );

    let currentSectionIndex = -1;
    let destinationSectionIndex = -1;

    if (currentTask && currentSection?.tasks && destinationSection.tasks) {
      currentSectionIndex = updatedSections.findIndex(
        (section: ISection) => section.status === currentSection?.status,
      );
      destinationSectionIndex = updatedSections.findIndex(
        (section: ISection) => section.status === destinationSection.status,
      );
      const currentTaskIndex = currentSection.tasks.indexOf(currentTask);
      const destinationTaskIndex =
        destinationSection.tasks.indexOf(destinationTask);
      if (
        updatedSections[currentSectionIndex] &&
        updatedSections[currentSectionIndex].tasks
      ) {
        updatedSections[currentSectionIndex].tasks?.splice(currentTaskIndex, 1);
      }
      const newTask = {
        ...currentTask,
        sectionId: destinationSection.id,
      };
      if (
        updatedSections[destinationSectionIndex] &&
        updatedSections[destinationSectionIndex].tasks
      ) {
        updatedSections[destinationSectionIndex].tasks?.splice(
          destinationTaskIndex + 1,
          0,
          newTask,
        );
      }
    }

    updateTaskPosition({
      resourceSection: updatedSections[currentSectionIndex],
      destinationSection: updatedSections[destinationSectionIndex],
    });
    const newBoard = {
      ...board,
      sections: updatedSections,
    };
    dispatch(setBoard(newBoard));
  }

  async function onDropTaskHandler(
    e: React.DragEvent<HTMLDivElement>,
    destinationSection: ISection,
  ) {
    e.preventDefault();
    if (board === null || currentTask === null || currentSection === null)
      return;

    const updatedSections = JSON.parse(JSON.stringify(board.sections));

    const currentSectionIndex = updatedSections.findIndex(
      (section: ISection) => section.status === currentSection.status,
    );
    const destinationSectionIndex = updatedSections.findIndex(
      (section: ISection) => section.status === destinationSection.status,
    );
    const currentTaskIndex = currentSection.tasks?.indexOf(currentTask);
    updatedSections[currentSectionIndex].tasks.splice(currentTaskIndex, 1);
    const newTask = { ...currentTask, sectionId: destinationSection.id };
    updatedSections[destinationSectionIndex].tasks.push(newTask);

    await updateTaskPosition({
      resourceSection: updatedSections[currentSectionIndex],
      destinationSection: updatedSections[destinationSectionIndex],
    });
    const newBoard: IBoard = {
      ...board,
      sections: updatedSections,
    };
    dispatch(setBoard(newBoard));
  }

  const dragAndDropMethods: IDragAndDropMethods = {
    onDragEndHandler,
    onDragLeaveHandler,
    onDragOverHandler,
    onDragStartHandler,
    onDropHandler,
    onDropTaskHandler,
  };

  async function deleteBoard(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!id) return;
    try {
      const { message } = (await boardApi.delete(id)).data;
      setIsDeleteModalActive(false);
      setAlertState(message, "info");
      navigate("/boards");
    } catch (error) {
      setAlertState(handleServerError(error), "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getBoard() {
      setLoading(true);
      try {
        if (!id) return;
        const response = await boardApi.getOne(id);
        const newBoard = response.data.board;
        dispatch(setBoard(newBoard));
      } catch (error) {
        setAlertState(handleServerError(error), "error");
        navigate("/boards");
      } finally {
        setLoading(false);
      }
    }
    getBoard();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="board">
      <div className="board__top">
        <span className="board__title">{board?.name}</span>
        <div className="board__menu">
          <Button
            type="primary"
            size="large"
            onClick={() => setIsEditBoardModalActive((prev) => !prev)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            size="large"
            danger
            onClick={() => setIsDeleteModalActive((prev) => !prev)}
          >
            Delete
          </Button>
        </div>
      </div>
      <Modal
        active={isEditBoardModalActive}
        setActive={setIsEditBoardModalActive}
      >
        <EditBoardForm
          setActiveModal={setIsEditBoardModalActive}
          board={board}
        />
      </Modal>
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <AddTaskForm
          setActiveModal={setIsModalActive}
          section={newTaskSection}
        />
      </Modal>
      <Modal active={isDeleteModalActive} setActive={setIsDeleteModalActive}>
        <ConfirmForm
          text="Do you want to delete this board?"
          confirmHandler={deleteBoard}
          setActive={setIsDeleteModalActive}
        />
      </Modal>
      <div className="lists">
        {board?.sections &&
          board.sections.map((section) => (
            <Section
              key={section.id}
              section={section}
              setModalActive={setIsModalActive}
              setNewTaskSection={setNewTaskSection}
              dragAndDropMethods={dragAndDropMethods}
            />
          ))}
      </div>
    </div>
  );
}

export default BoardPage;
