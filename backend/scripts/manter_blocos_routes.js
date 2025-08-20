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
    const { nome, apartamento_id } = req.body;
    db.query(
        'INSERT INTO moradores (nome, apartamento_id) VALUES (?, ?)',
        [nome, apartamento_id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, nome, apartamento_id });
        }
    );
});

module.exports = router;
