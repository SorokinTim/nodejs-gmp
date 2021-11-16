import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import sequelize from "./data-acess/db";
import api from "./api/api";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/', api);

app.all('*', (req, res) => {
    res.send('Error, data not found!');
});

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running at ${PORT}`));
});
