import express from "express";
import bodyParser from "body-parser";
import sequelize from "./data-acess/db";
import api from "./api/api";
import { loggerMiddleware } from "./middlewares/loggers";
import { unhandledErrorsMiddleware } from "./middlewares/errorHandler";
import ApiError from "./errors/ApiError";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json({ type: 'application/json' }));
app.use(loggerMiddleware);

app.use('/', api);

app.all('*', (req, res, next) => {
    next(ApiError.dataNotFound());
});

app.use(unhandledErrorsMiddleware);

process.on('uncaughtException', () => {
    process.exit(1);
});

process.on('unhandledRejection', () => {
    process.exit(1);
});

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running at ${PORT}`));
});
