const express = require('express');
const router = express.Router();
const db = require('./db_connection');

router.post('/', (req, res) => {
  const { bloco, numero } = req.body;

  if (!bloco || !numero) {
    return res.status(400).json({ error: 'Bloco e número são obrigatórios.' });
  }

  const sql = 'INSERT INTO apartamentos (bloco, numero) VALUES (?, ?)';
  db.query(sql, [bloco, numero], (err, result) => {
    if (err) {
      console.error('Erro ao inserir apartamento:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar apartamento.' });
    }

    res.status(201).json({ message: 'Apartamento cadastrado com sucesso!' });
  });
});

module.exports = router;
