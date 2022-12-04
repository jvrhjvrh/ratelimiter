const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authMiddleware = require('./middleware/auth');

const publicRouter = require('./routes/public');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', publicRouter);
app.use('/auth', authMiddleware, authRouter);

module.exports = app;
