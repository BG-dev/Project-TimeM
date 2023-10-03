const Board = require("../models/Board");
const Section = require("../models/Section");
const Task = require("../models/Task");
const User = require("../models/User");

exports.create = async (req, res) => {
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
        return res.status(201).send({
            board,
            message: "The board was successfully created",
        });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.getOne = async (req, res) => {
    const id = req.params.id;

    try {
        const isHasPermissions = await Board.findOne({
            id,
            users: { $elemMatch: { user: req.user.id } },
        });
        if (!isHasPermissions)
            return res.status(403).send({ message: "You don't have access" });
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
        return res.status(200).send({ board });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.getUserBoards = async (req, res) => {
    const userId = req.user.id;
    try {
        const boards = (await User.findById(userId).populate("boards")).boards;
        return res.status(200).send({ boards });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.update = async (req, res) => {
    const boardId = req.params.id;
    try {
        const isHasPermissions = await Board.findOne({
            id: boardId,
            users: { $elemMatch: { user: req.user.id, role: "author" } },
        });
        if (!isHasPermissions)
            return res
                .status(403)
                .send({ message: "You don't have permission" });
        const board = await Board.findByIdAndUpdate(boardId, req.body);
        return res.status(200).send({
            board,
            message: "The board has been successfully updated",
        });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.delete = async (req, res) => {
    const boardId = req.params.id;
    try {
        const isHasPermissions = await Board.findOne({
            id: boardId,
            users: { $elemMatch: { user: req.user.id, role: "author" } },
        });
        if (!isHasPermissions)
            return res
                .status(403)
                .send({ message: "You don't have permission" });
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
        const sections = await Section.find({ boardId: boardId });
        sections.forEach(
            async (section) => await Task.deleteMany({ sectionId: section._id })
        );
        await Section.deleteMany({ boardId: boardId });
        return res.status(200).send({ message: "Board has been deleted" });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.addUserToBoard = async (req, res) => {
    const data = {
        ...req.body,
    };
    try {
        const isHasPermissions = await Board.findOne({
            id: data.boardId,
            users: { $elemMatch: { user: req.user.id, role: "author" } },
        });
        if (!isHasPermissions)
            return res
                .status(403)
                .send({ message: "You don't have permission" });
        await Board.findByIdAndUpdate(data.boardId, {
            $push: {
                users: {
                    user: data.userId,
                    role: data.role,
                },
            },
        });
        await User.findByIdAndUpdate(
            data.userId,
            {
                $push: {
                    boards: data.boardId,
                },
            },
            {
                upsert: true,
            }
        );
        return res.status(200).send({
            message: "The board was successfully updated",
        });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};
