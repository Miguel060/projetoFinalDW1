const LivrosRepository = require("../repositories/livros.repository");

class LivrosController {
    constructor() {
        this.livrosRepository = new LivrosRepository();
    }

    async listarLivros(req, res, next) {
        try {
            const livros = this.livrosRepository.findAll(); // NÃO usa await
            res.status(200).json(livros);
        } catch (err) {
            console.error(err);
            res.status(500).json({ erro: "Erro interno ao listar livros" });
        }
    }



    async buscarLivroPorId(req, res, next) {
        const id = parseInt(req.params.id);
        const livro = await this.livrosRepository.findById(id);
        if (!livro) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }
        res.status(200).json(livro);
    }

    async criarLivro(req, res, next) {
        const { titulo, autor, categoria, ano, editora } = req.body;
        const novoLivro = await this.livrosRepository.create({
            titulo,
            autor,
            categoria,
            ano: parseInt(ano),
            editora
        });
        res.status(201).json({
            mensagem: "Livro criado com sucesso",
            data: novoLivro
        });
    }

    async atualizarLivro(req, res, next) {
        const id = parseInt(req.params.id);
        const { titulo, autor, categoria, ano, editora } = req.body;
        const livroAtualizado = await this.livrosRepository.update(id, {
            titulo,
            autor,
            categoria,
            ano: parseInt(ano),
            editora
        });

        res.status(200).json({
            mensagem: "Capa atualizada com sucesso",
            data: livroAtualizado
        });
    }

    async removerLivro(req, res, next) {
        const id = parseInt(req.params.id);
        const livroRemovido = await this.livrosRepository.delete(id);
        res.status(200).json({
            mensagem: "Livro removido com sucesso",
            data: livroRemovido
        });
    }

    async uploadCover(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (!req.file) {
                return res.status(400).json({ erro: 'Nenhum arquivo de capa enviado.' });
            }

            // O caminho relativo é /uploads/nome_do_arquivo
            const relativePath = `/uploads/${req.file.filename}`;

            const livroAtualizado = await this.livrosRepository.updateCoverPath(id, relativePath);

            res.status(200).json({
                mensagem: "Capa atualizada com sucesso",
                data: livroAtualizado
            });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = LivrosController;