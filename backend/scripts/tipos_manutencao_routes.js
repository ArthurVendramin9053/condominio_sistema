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
    const { nome, descricao } = req.body;
    db.query(
        'INSERT INTO tipos_manutencao (nome, descricao) VALUES (?, ?)',
        [nome, descricao],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId });
        }
    );
});

router.put('/:id', (req, res) => {
    const { nome, descricao } = req.body;
    const { id } = req.params;
    db.query(
        'UPDATE tipos_manutencao SET nome = ?, descricao = ? WHERE id = ?',
        [nome, descricao, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.sendStatus(200);
        }
    );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tipos_manutencao WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

module.exports = router;
