const express = require('express');
const router = express.Router();
const db = require('./db_connection');

// Listar todos os apartamentos
router.get('/', (req, res) => {
  db.query('SELECT * FROM apartamentos ORDER BY bloco, numero', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar apartamentos.' });
    res.json(results);
  });
});

// Cadastrar novo apartamento
router.post('/', (req, res) => {
  const { bloco, numero } = req.body;

  if (!bloco || !numero) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const checkSql = 'SELECT * FROM apartamentos WHERE bloco = ? AND numero = ?';
  db.query(checkSql, [bloco, numero], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao verificar duplicidade.' });
    if (results.length > 0) return res.status(409).json({ error: 'Apartamento já cadastrado.' });

    const insertSql = 'INSERT INTO apartamentos (bloco, numero) VALUES (?, ?)';
    db.query(insertSql, [bloco, numero], (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao cadastrar apartamento.' });
      res.status(201).json({ message: 'Apartamento cadastrado com sucesso!' });
    });
  });
});

// Atualizar apartamento
router.put('/:id', (req, res) => {
  const { bloco, numero } = req.body;
  const id = req.params.id;

  if (!bloco || !numero) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const sql = 'UPDATE apartamentos SET bloco = ?, numero = ? WHERE id = ?';
  db.query(sql, [bloco, numero, id], (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao atualizar apartamento.' });
    res.json({ message: 'Apartamento atualizado com sucesso!' });
  });
});

// Excluir apartamento
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM apartamentos WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao excluir apartamento.' });
    res.json({ message: 'Apartamento excluído com sucesso!' });
  });
});

module.exports = router;
