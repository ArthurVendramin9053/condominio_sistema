const express = require('express');
const router = express.Router();
const db = require('./db_connection');

router.get('/', (req, res) => {
    db.query('SELECT * FROM pagamentos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { morador_id, valor, data_pagamento } = req.body;
    db.query(
        'INSERT INTO pagamentos (morador_id, valor, data_pagamento) VALUES (?, ?, ?)',
        [morador_id, valor, data_pagamento],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, morador_id, valor, data_pagamento });
        }
    );
});

module.exports = router;
