const Board = require("../models/Board");
const Section = require("../models/Section");
const Task = require("../models/Task");
const User = require("../models/User");

exports.create = async (req, res) => {
    console.log(req.user);
    const boardData = {
        ...req.body,
        authorName: req.user.username,
        users: [
            {
                user: req.user.id,
                role: "author",
            },
        ],
    };
    try {
        const board = await Board.create({ ...boardData });
        await User.findByIdAndUpdate(
            req.user.id,
            {
                $push: {
                    boards: board._id,
                },
            },
            {
                upsert: true,
            }
        );
        res.status(201).send({ board });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

exports.update = async (req, res) => {
    const boardId = req.params.id;
    try {
        const board = await Board.findByIdAndUpdate(boardId, req.body);
        res.status(200).send(board);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

exports.delete = async (req, res) => {
    const boardId = req.params.id;
    try {
        await Board.findByIdAndDelete(boardId);
        await User.updateMany(
            {
                boards: {
                    $in: boardId,
                },
            },
            {
                $pull: {
                    boards: boardId,
                },
            },
            {
                upsert: true,
            }
        );
        await Task.deleteMany({ board: boardId });
        res.status(200).send({ message: "Board has been deleted" });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

exports.getUserBoards = async (req, res) => {
    const userId = req.user.id;
    try {
        const boards = (await User.findById(userId).populate("boards")).boards;
        res.status(200).send({ boards });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

exports.getOne = async (req, res) => {
    const id = req.params.id;

    try {
        const board = await Board.findById(id);
        const sections = await Section.find({ boardId: board._id }).sort(
            "position"
        );
        for (const section of sections) {
            const tasks = await Task.find({ sectionId: section._id }).sort(
                "position"
            );
            section._doc.tasks = tasks;
        }
        board._doc.sections = sections;
        res.status(200).send({ board });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};
