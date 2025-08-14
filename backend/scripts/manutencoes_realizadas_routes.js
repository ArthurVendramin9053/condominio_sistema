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
    const { tipo_id, data, valor, observacao } = req.body;
    db.query(
        'INSERT INTO manutencoes_realizadas (tipo_id, data, valor, observacao) VALUES (?, ?, ?, ?)',
        [tipo_id, data, valor, observacao],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId });
        }
    );
});

router.put('/:id', (req, res) => {
    const { tipo_id, data, valor, observacao } = req.body;
    const { id } = req.params;
    db.query(
        'UPDATE manutencoes_realizadas SET tipo_id = ?, data = ?, valor = ?, observacao = ? WHERE id = ?',
        [tipo_id, data, valor, observacao, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.sendStatus(200);
        }
    );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM manutencoes_realizadas WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

module.exports = router;
