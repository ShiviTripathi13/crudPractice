// Task Controller
const Task = require("../model/taskSchema");

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            status: "success",
            count: tasks.length,
            data: {
                tasks
            }
        })
    } catch(e) {
        res.status(400).json({
            status: "Failed to get task list"
        })
    }
}

const getOneTask = async (req, res, next) => {
    try {
        const tasks = await Task.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                tasks
            }
        })
    } catch(e) {
        res.status(400).json({
            status: "Failed to get one task"
        })
    }
}

const createTask = async (req, res, next) => {
    try {
        const tasks = await Task.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                tasks
            }
        })
    } catch(e) {
        res.status(400).json({
            status: "Failed to create task"
        })
    }
}

module.exports = {getAllTasks,
                    getOneTask,
                    createTask};