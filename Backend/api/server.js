const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const boardsRoutes = require("./routes/boards");
const usersRoutes = require("./routes/users");
const tasksRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");
const logger = require("./middlewares/logger");
const { logError, sendError } = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(helmet());

app.use("/boards", boardsRoutes);
app.use("/tasks", tasksRoutes);
app.use("/api/auth", authRoutes);
app.use("/users", usersRoutes);

app.use(logError);
app.use(sendError);

app.listen(port, () => {
  logger.info(`Server was started on port: ${port}`);
});
