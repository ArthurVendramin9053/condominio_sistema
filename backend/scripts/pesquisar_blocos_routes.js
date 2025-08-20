const express = require('express');
const router = express.Router();
const db = require('./db_connection');

// Listar blocos
router.get('/', (req, res) => {
  db.query('SELECT * FROM blocos ORDER BY nome', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar blocos.' });
    res.json(results);
  });
});

// Cadastrar bloco
router.post('/', (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ error: 'Nome obrigatório.' });

  db.query('SELECT * FROM blocos WHERE nome = ?', [nome], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao verificar duplicidade.' });
    if (results.length > 0) return res.status(409).json({ error: 'Bloco já cadastrado.' });

    db.query('INSERT INTO blocos (nome) VALUES (?)', [nome], (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao cadastrar bloco.' });
      res.status(201).json({ message: 'Bloco cadastrado com sucesso!' });
    });
  });
});

// Alterar bloco
router.put('/:id', (req, res) => {
  const { nome } = req.body;
  const id = req.params.id;
  if (!nome) return res.status(400).json({ error: 'Nome obrigatório.' });

  db.query('UPDATE blocos SET nome = ? WHERE id = ?', [nome, id], (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao atualizar bloco.' });
    res.json({ message: 'Bloco atualizado com sucesso!' });
  });
});

// Excluir bloco
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM blocos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao excluir bloco.' });
    res.json({ message: 'Bloco excluído com sucesso!' });
  });
});

module.exports = router;
