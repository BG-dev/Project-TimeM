import React, { useEffect, useState } from "react";
import {
    BoardCard,
    NewBoardCard,
    Modal,
    AddNewBoardForm,
} from "../../components";
import boardApi from "../../api/boardApi";
import "./BoardsPage.scss";
import IBoard from "../../types/board";

function BoardsPage() {
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [boards, setBoards] = useState<IBoard[]>([]);

    useEffect(() => {
        async function getBoards() {
            setLoading(true);
            try {
                const response = await boardApi.getUserBoards();
                const boards: IBoard[] = response.data.boards;
                setBoards(boards);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getBoards();
    }, []);

    return (
        <>
            <Modal active={isModalActive} setActive={setIsModalActive}>
                <AddNewBoardForm
                    boards={boards}
                    setBoards={setBoards}
                    setActiveModal={setIsModalActive}
                />
            </Modal>
            <div className="boards">
                <ul className="boards__list">
                    <NewBoardCard setActive={setIsModalActive} />
                    {boards.length &&
                        boards.map((board: IBoard) => (
                            <BoardCard key={board.id} board={board} />
                        ))}
                </ul>
            </div>
        </>
    );
}

export default BoardsPage;
