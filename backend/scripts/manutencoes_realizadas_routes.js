const express = require('express');
const router = express.Router();
const db = require('./db_connection');

router.get('/', (req, res) => {
    db.query('SELECT * FROM manutencoes_realizadas', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { tipo_id, descricao, data_realizacao } = req.body;
    db.query(
        'INSERT INTO manutencoes_realizadas (tipo_id, descricao, data_realizacao) VALUES (?, ?, ?)',
        [tipo_id, descricao, data_realizacao],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, tipo_id, descricao, data_realizacao });
        }
    );
});

module.exports = router;
s