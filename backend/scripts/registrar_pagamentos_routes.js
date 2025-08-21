const express = require('express');
const router = express.Router();
const db = require('./db_connection');

// Buscar moradores
router.get('/moradores', (req, res) => {
  db.query('SELECT * FROM moradores ORDER BY apartamento', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar moradores.' });
    res.json(results);
  });
});

// Registrar pagamento
router.post('/registrar', (req, res) => {
  const { referencia, apartamento, cpf, nome, telefone, valor, vencimento } = req.body;

  if (!referencia || !apartamento || !cpf || !nome || !telefone || !valor || !vencimento) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const sql = `
    INSERT INTO pagamentos (referencia, apartamento, cpf, nome, telefone, valor, vencimento)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [referencia, apartamento, cpf, nome, telefone, valor, vencimento], (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao registrar pagamento.' });
    res.status(201).json({ message: 'Pagamento registrado com sucesso!' });
  });
});

module.exports = router;
