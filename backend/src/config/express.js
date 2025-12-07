const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");

const app = express();
const path = require('path');

app.use(express.json()); // Middleware para interpretar JSON no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Suporte para dados de formulários
app.use(morgan("common")); // Logging HTTP
app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads'))); // Servir arquivos estáticos da pasta uploads
app.use(cors({
    origin: "http://localhost:3000", // Permite requisições apenas deste domínio
    credentials: true // Permite envio de cookies
})); // Habilita CORS para o frontend

app.use(session({
    secret: process.env.SESSION_SECRET || "livraria_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // true apenas em produção HTTPS
        maxAge: 1000 * 60 * 60 * 2, // 2 horas
        sameSite: 'strict'
    }
}));

module.exports = app;