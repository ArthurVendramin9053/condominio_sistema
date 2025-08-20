const express = require('express');
const router = express.Router();
const db = require('./db_connection');

// Cadastrar novo tipo de manutenção
router.post('/', (req, res) => {
  const { descricao } = req.body;

  if (!descricao) {
    return res.status(400).json({ error: 'Descrição é obrigatória.' });
  }

  // Verifica duplicidade
  const checkSql = 'SELECT * FROM manutencoes WHERE LOWER(descricao) = LOWER(?)';
  db.query(checkSql, [descricao], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao verificar duplicidade.' });
    if (results.length > 0) return res.status(409).json({ error: 'Tipo já cadastrado.' });

    // Insere novo tipo
    const insertSql = 'INSERT INTO manutencoes (descricao) VALUES (?)';
    db.query(insertSql, [descricao], (err, result) => {
      if (err) return res.status(500).json({ error: 'Erro ao cadastrar tipo.' });
      res.status(201).json({ message: 'Tipo cadastrado com sucesso!' });
    });
  });
});

// Listar todos os tipos de manutenção
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM manutencoes ORDER BY descricao';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar tipos.' });
    res.json(results);
  });
});

module.exports = router;
