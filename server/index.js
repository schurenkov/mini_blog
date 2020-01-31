import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import db from './db';
import router from './routes';

const app = express();
const apiPort = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
});

app.use('/api', router);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
