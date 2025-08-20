const express = require('express');
const router = express.Router();
const db = require('./db_connection');

router.get('/', (req, res) => {
    db.query('SELECT * FROM tipos_manutencao', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { nome } = req.body;
    db.query(
        'INSERT INTO tipos_manutencao (nome) VALUES (?)',
        [nome],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, nome });
        }
    );
});

module.exports = router;
