// src/repositories/livros.repository.js
const RepositoryBase = require("./repository.interface");
const db = require("../database/sqlite");
const Livro = require("../models/livro.model");

class LivrosRepository extends RepositoryBase {
    constructor() {
        super();
    }

    findAll() {
        const rows = db.all(
            "SELECT id, titulo, autor, categoria, ano, editora, cover_path FROM livros ORDER BY id ASC"
        );
        return rows.map(row => Livro.fromJSON(row));
    }

    findById(id) {
        const row = db.get(
            "SELECT id, titulo, autor, categoria, ano, editora, cover_path FROM livros WHERE id = ?",
            [id]
        );
        return row ? Livro.fromJSON(row) : null;
    }

    create(livroData) {
        const novoLivro = new Livro({ id: null, ...livroData });

        const result = db.run(
            "INSERT INTO livros (titulo, autor, categoria, ano, editora) VALUES (?, ?, ?, ?, ?)",
            [
                novoLivro.titulo,
                novoLivro.autor,
                novoLivro.categoria,
                novoLivro.ano,
                novoLivro.editora
            ]
        );

        return this.findById(result.lastInsertRowid);
    }

    update(id, dadosAtualizados) {
        const existente = this.findById(id);
        if (!existente) {
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }

        const atualizado = new Livro({
            ...existente.toJSON(),
            ...dadosAtualizados
        });

        db.run(
            "UPDATE livros SET titulo = ?, autor = ?, categoria = ?, ano = ?, editora = ? WHERE id = ?",
            [
                atualizado.titulo,
                atualizado.autor,
                atualizado.categoria,
                atualizado.ano,
                atualizado.editora,
                id
            ]
        );

        return this.findById(id);
    }

    delete(id) {
        const existente = this.findById(id);
        if (!existente) {
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }

        db.run("DELETE FROM livros WHERE id = ?", [id]);
        return existente;
    }

    updateCoverPath(id, coverPath) {
        const existente = this.findById(id);
        if (!existente) {
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }

        db.run(
            "UPDATE livros SET cover_path = ? WHERE id = ?",
            [coverPath, id]
        );

        return this.findById(id);
    }
}

module.exports = LivrosRepository;
