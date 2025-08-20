const express = require('express');
const router = express.Router();
const db = require('./db_connection');

router.get('/', (req, res) => {
    db.query('SELECT * FROM apartamentos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { numero, bloco_id } = req.body;
    db.query(
        'INSERT INTO apartamentos (numero, bloco_id) VALUES (?, ?)',
        [numero, bloco_id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, numero, bloco_id });
        }
    );
});

module.exports = router;
