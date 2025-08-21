const express = require('express');
const router = express.Router();
const db = require('./db_connection');

// Buscar tipos de manutenção
router.get('/tipos', (req, res) => {
  db.query('SELECT * FROM manutencoes ORDER BY descricao', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar tipos.' });
    res.json(results);
  });
});

// Registrar manutenção realizada
router.post('/registro', (req, res) => {
  const { tipo, data, local } = req.body;

  if (!tipo || !data || !local) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const sql = 'INSERT INTO manutencao_realizada (tipo, data, local) VALUES (?, ?, ?)';
  db.query(sql, [tipo, data, local], (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao registrar manutenção.' });
    res.status(201).json({ message: 'Manutenção registrada com sucesso!' });
  });
});

module.exports = router;
