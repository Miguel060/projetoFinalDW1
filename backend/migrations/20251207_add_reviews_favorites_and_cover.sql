-- Migration: add reviews table, favorites table and cover_path to livros
-- Ajuste o SQL ao dialeto do seu DB (Postgres / MySQL). Exemplo escrito para Postgres.

BEGIN;

-- Adiciona coluna cover_path na tabela livros (se não existir)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='livros' AND column_name='cover_path') THEN
    ALTER TABLE livros ADD COLUMN cover_path VARCHAR(255);
  END IF;
END$$;

-- Cria tabela reviews
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  book_id BIGINT NOT NULL,
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_reviews_book FOREIGN KEY (book_id) REFERENCES livros(id) ON DELETE CASCADE
);

-- Cria tabela favorites
CREATE TABLE IF NOT EXISTS favorites (
  user_id BIGINT NOT NULL,
  book_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, book_id),
  CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_favorites_book FOREIGN KEY (book_id) REFERENCES livros(id) ON DELETE CASCADE
);

COMMIT;
