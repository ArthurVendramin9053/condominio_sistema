const express = require('express');
const router = express.Router();
const db = require('./db_connection');

router.get('/', (req, res) => {
    db.query('SELECT * FROM moradores', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { nome, apartamento_id, telefone } = req.body;
    db.query(
        'INSERT INTO moradores (nome, apartamento_id, telefone) VALUES (?, ?, ?)',
        [nome, apartamento_id, telefone],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId });
        }
    );
});

router.put('/:id', (req, res) => {
    const { nome, apartamento_id, telefone } = req.body;
    const { id } = req.params;
    db.query(
        'UPDATE moradores SET nome = ?, apartamento_id = ?, telefone = ? WHERE id = ?',
        [nome, apartamento_id, telefone, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.sendStatus(200);
        }
    );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM moradores WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

module.exports = router;
