import express from "express";
import bodyParser from "body-parser";
import sequelize from "./data-acess/db";
import api from "./api/api";
import { logger } from "./middlewares/logger";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json({ type: 'application/json' }));
app.use(logger);

app.use('/', api);

app.all('*', (req, res) => {
    res.send('Error, data not found!');
});

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running at ${PORT}`));
});
