// Task Routes

const express = require("express");
const {getAllTasks,
        getOneTask,
        createTask} = require("../controllers/taskController");

const router = express.Router();

// endpoints - localhost:3000
router.route("/task").get(getAllTasks).post(createTask);


// endpoints - localhost:3000/:id
router.route("/:id").get(getOneTask);

module.exports = router;