const axios = require("axios");
const Board = require("../integration/models/Board");
const { validateBoard } = require("../service/validators/boardValidator");

async function addBoard(newBoardData) {
  const { error } = validateBoard(newBoardData);
  if (error) throw new Error(error.details[0].message);

  const board = await createBoardInTrello(newBoardData);
  createBoard(board);
}

async function getBoards() {
  const boards = await Board.find();

  return boards;
}

async function createBoardInTrello(boardData) {
  if (!boardData) throw new Error("Board data is undefined");
  const url = process.env.URL;
  const response = await axios.post(`${url}/1/boards`, {
    name: boardData.name,
    desc: boardData.desc,
    prefs_background: boardData.color,
    key: process.env.KEY,
    token: process.env.TOKEN,
  });

  const trelloBoardId = response.data.id;
  return {
    trelloBoardId,
    ...boardData,
  };
}

async function updateBoardInTrello(boardData) {
  if (!boardData) throw new Error("board data is undefined");

  const id = boardData.id;
  const url = process.env.URL;
  await axios.put(`${url}/1/boards/${id}?prefs/background=${boardData.color}`, {
    name: boardData.name,
    desc: boardData.desc,
    key: process.env.KEY,
    token: process.env.TOKEN,
  });
}

async function deleteBoardFromTrello(id) {
  if (!id) throw new Error("id is undefined");

  const url = process.env.URL;
  const key = process.env.KEY;
  const token = process.env.TOKEN;
  await axios.delete(`${url}/1/boards/${id}`, {
    params: {
      key: key,
      token: token,
    },
  });
}

const createBoard = async (newBoard) => await Board.create({ ...newBoard });

module.exports = {
  addBoard,
  getBoards,
  updateBoardInTrello,
  deleteBoardFromTrello,
};
