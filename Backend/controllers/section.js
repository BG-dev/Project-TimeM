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

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const section = await Section.findByIdAndUpdate(id, req.body);
        res.status(200).send(section);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const section = await Section.findById(id);
        await Section.findByIdAndDelete(id);
        await Task.deleteMany({ sectionId: id });
        const sections = await Section.find({ boardId: section.boardId }).sort(
            "position"
        );
        for (const key in sections) {
            await Section.findByIdAndUpdate(sections[key]._id, {
                $set: { position: key },
            });
        }
        res.status(200).send({ message: "Section has been deleted" });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

exports.getOne = async (req, res) => {
    const id = req.params.id;
    try {
        const section = await Section.findById(id);
        const tasks = await Task.find({ sectionId: section._id }).sort(
            "position"
        );
        section._doc.tasks = tasks;
        res.status(200).send({ section });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};
