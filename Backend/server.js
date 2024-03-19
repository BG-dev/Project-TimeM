const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const boardRoutes = require('./routes/board');
const userRoutes = require('./routes/user');
const sectionRoutes = require('./routes/section');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');
const logger = require('./middlewares/logger');
const { logError, sendError } = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(helmet());

app.use('/boards', boardRoutes);
app.use('/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/sections', sectionRoutes);

// app.use(logError);
// app.use(sendError);

app.listen(port, () => {
    console.info(`Server was started on port: ${port}`);
    // logger.info(`Server was started on port: ${port}`);
});
