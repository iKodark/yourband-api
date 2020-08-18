const express = require('express');
const consign = require('consign');
const cors = require('cors');
require('dotenv-safe').config();

const app = express();

app.use(express.json());
app.use(cors());

consign()
    .include('src/middlewares/middleware.js')
    .include('src/database/connect.js')
    .then('src/routes/auth.js')
    .include('src/middlewares/token.js')
    .then('src/routes')
    .then('src/libs/boot.js')
    .into(app)
    