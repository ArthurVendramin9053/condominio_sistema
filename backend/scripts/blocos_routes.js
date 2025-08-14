const express = require('express');
const router = express.Router();
const db = require('./db_connection');

router.get('/', (req, res) => {
    db.query('SELECT * FROM blocos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { descricao, quantidade_apartamentos } = req.body;
    db.query(
        'INSERT INTO blocos (descricao, quantidade_apartamentos) VALUES (?, ?)',
        [descricao, quantidade_apartamentos],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, descricao, quantidade_apartamentos });
        }
    );
});

module.exports = router;