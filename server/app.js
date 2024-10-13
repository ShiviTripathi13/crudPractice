const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoute.js');
const taskRoutes = require('./routes/taskRoute.js');

const mongoose = require('mongoose');

const {MONGO_USER, MONGO_URI, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, PORT} = require('./config/config.js');
// const MONGODB_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const MONGODB_URI = MONGO_URI;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDb");
    })
    .catch((err) => {
        console.log(err);
    })


app.use(express.json());

// user route
app.use('/api/v1/user', userRoutes);

// task route
app.use("/api/v1/tasks", taskRoutes);

app.get('/', (req, res, next) => {
    res.send("Hello World! Going to practice CRUD.");
})

// connecting server to port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

module.exports = app;