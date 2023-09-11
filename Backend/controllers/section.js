const Board = require("../models/Board");
const Task = require("../models/Task");
const Section = require("../models/Section");

exports.create = async (req, res) => {
    try {
        const boardSectionsCount = await Section.find({
            boardId: req.body.boardId,
        }).count();
        const sectionData = {
            ...req.body,
            position: boardSectionsCount,
        };
        const section = await Section.create(sectionData);
        res.status(201).send({ section });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

// exports.update = async (req, res) => {
//     const boardId = req.params.id;
//     const board = req.body;
//     try {
//         const board = await Board.findByIdAndUpdate(boardId, board);
//         res.status(200).send(board);
//     } catch (err) {
//         res.status(500).send({ error: err });
//     }
// };

// exports.delete = async (req, res) => {
//     const boardId = req.params.id;
//     try {
//         await Board.findByIdAndDelete(boardId);
//         await User.updateMany(
//             {
//                 boards: {
//                     $in: boardId,
//                 },
//             },
//             {
//                 $pull: {
//                     boards: boardId,
//                 },
//             },
//             {
//                 upsert: true,
//             }
//         );
//         await Task.deleteMany({ board: boardId });
//         res.status(200).send({ message: "Board has been deleted" });
//     } catch (err) {
//         res.status(500).send({ error: err });
//     }
// };

// exports.getOne = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const board = (await Board.findById(id)).toJSON();
//         const boardsTasks = await Task.find({ board: id });
//         const taskLists = [];
//         board.lists.forEach((list) => {
//             filteredTasks = boardsTasks
//                 .filter((task) => task.status === list)
//                 .sort((a, b) => a.position - b.position);
//             taskLists.push({
//                 status: list,
//                 tasks: filteredTasks,
//             });
//         });
//         board.tasks = taskLists;
//         res.status(200).send({ board });
//     } catch (err) {
//         res.status(500).send({ error: err });
//     }
// };
