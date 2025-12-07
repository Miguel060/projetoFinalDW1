// todas as rotas aqui
const express = require("express");
const router = express.Router();

// Rotas de livros
const livrosRoutes = require("./livros.routes");
// Rotas de autenticação
const authRoutes = require("./auth.routes");
// Rotas de favoritos
const favoritesRoutes = require("./favorites.routes");
// Rotas de reviews
const reviewsRoutes = require("./reviews.routes");

// Rota inicial (explicação do sistema)
router.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "Bem-vindo à API da Livraria! Use /livros para gerenciar os livros.",
    });
});

// Usa as rotas de livros
router.use("/livros", livrosRoutes);
// Usa as rotas de autenticação
router.use("/auth", authRoutes);
// Usa as rotas de favoritos
router.use("/favorites", favoritesRoutes);
// Usa as rotas de reviews
router.use("/reviews", reviewsRoutes);


module.exports = router;