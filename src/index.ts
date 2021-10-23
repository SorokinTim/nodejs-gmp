import express from "express";
import users from './routes/router';

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/', users);

app.all('*', (req, res) => {
    res.send('Error, data not found!');
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
