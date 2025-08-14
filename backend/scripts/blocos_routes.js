const express = require('express');
const router = express.Router();
const db = require('../scripts/db_connection');

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
            res.json({ id: result.insertId });
        }
    );
});

router.put('/:id', (req, res) => {
    const { descricao, quantidade_apartamentos } = req.body;
    const { id } = req.params;
    db.query(
        'UPDATE blocos SET descricao = ?, quantidade_apartamentos = ? WHERE id = ?',
        [descricao, quantidade_apartamentos, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.sendStatus(200);
        }
    );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM blocos WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

module.exports = router;
