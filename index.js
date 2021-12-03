import http from 'http';
import express from 'express';
import path, { dirname } from 'path';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const __dirname = path.resolve();
console.log(__dirname);

let app = express();
let server = http.createServer(app);

app.set('views', './template');
app.set('view engine', 'pug')

app.use(cors());
app.use('/static', express.static(path.join(__dirname, './static')));

let checkAuth = (req, res, next) => {
    next();
}

app.get('/', (req, res) => {
    res.render('login', {
        google_client_id: process.env.GOOGLE_CLIENT_ID,
    });
})

app.get('/dashboard', checkAuth, (req, res) => {
    res.render('dashboard', {});
})


server.listen(process.env.PORT || 3000, (err) => {
    !err ? console.log('listening') : console.error(err);
})
