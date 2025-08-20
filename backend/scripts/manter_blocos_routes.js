const express = require('express');
const router = express.Router();
const db = require('./db_connection');

// Cadastrar novo bloco
router.post('/', (req, res) => {
  const { nome, apartamentos } = req.body;

  if (!nome || !apartamentos) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const checkSql = 'SELECT * FROM blocos WHERE LOWER(nome) = LOWER(?)';
  db.query(checkSql, [nome], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao verificar duplicidade.' });
    if (results.length > 0) return res.status(409).json({ error: 'Bloco já cadastrado.' });

    const insertSql = 'INSERT INTO blocos (nome, apartamentos) VALUES (?, ?)';
    db.query(insertSql, [nome, apartamentos], (err, result) => {
      if (err) return res.status(500).json({ error: 'Erro ao cadastrar bloco.' });
      res.status(201).json({ message: 'Bloco cadastrado com sucesso!' });
    });
  });
});

// Consultar bloco por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM blocos WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar bloco.' });
    if (results.length === 0) return res.status(404).json({ error: 'Bloco não encontrado.' });
    res.json(results[0]);
  });
});

// Atualizar bloco
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nome, apartamentos } = req.body;

  if (!nome || !apartamentos) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const sql = 'UPDATE blocos SET nome = ?, apartamentos = ? WHERE id = ?';
  db.query(sql, [nome, apartamentos, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao atualizar bloco.' });
    res.json({ message: 'Bloco atualizado com sucesso!' });
  });
});

module.exports = router;
