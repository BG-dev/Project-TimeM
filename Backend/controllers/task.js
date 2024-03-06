const Task = require('../models/Task');

exports.create = async (req, res) => {
    try {
        const sectionTasksCount = await Task.find({
            sectionId: req.body.sectionId,
        }).count();
        const taskData = {
            ...req.body,
            position: sectionTasksCount,
        };
        const task = await Task.create(taskData);
        res.status(201).send({
            task,
            message: 'The task was successfully created',
        });
    } catch (error) {
        res.status(400).send({ error });
    }
};

exports.getOne = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        res.status(200).send({ task });
    } catch (error) {
        res.status(400).send({ error });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findByIdAndUpdate(id, req.body);
        res.status(200).send({
            task,
            message: 'The task was successfully updated',
        });
    } catch (error) {
        res.status(400).send({ error });
    }
};

exports.updatePosition = async (req, res) => {
    const { resourceSection, destinationSection } = req.body;
    try {
        if (resourceSection.status !== destinationSection.status) {
            resourceSection.tasks.forEach(async (task, index) => {
                await Task.findByIdAndUpdate(task._id, {
                    $set: { sectionId: resourceSection._id, position: index },
                });
            });
        }
        destinationSection.tasks.forEach(async (task, index) => {
            await Task.findByIdAndUpdate(task._id, {
                $set: { sectionId: destinationSection._id, position: index },
            });
        });
        res.status(200).send({ message: 'Task successfully updated' });
    } catch (error) {
        res.status(400).send({ error });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        await Task.findByIdAndDelete(id);
        const tasks = await Task.find({ sectionId: task.sectionId }).sort('position');
        for (const key in tasks) {
            await Task.findByIdAndUpdate(tasks[key]._id, {
                $set: { position: key },
            });
        }
        res.status(200).send({ message: 'Task has been deleted' });
    } catch (error) {
        res.status(400).send({ error });
    }
};
