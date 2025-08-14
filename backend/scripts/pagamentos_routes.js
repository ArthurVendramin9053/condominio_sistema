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
    const { morador_id, referencia_id, data_pagamento, valor_pago } = req.body;
    db.query(
        'INSERT INTO pagamentos (morador_id, referencia_id, data_pagamento, valor_pago) VALUES (?, ?, ?, ?)',
        [morador_id, referencia_id, data_pagamento, valor_pago],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId });
        }
    );
});

router.put('/:id', (req, res) => {
    const { morador_id, referencia_id, data_pagamento, valor_pago } = req.body;
    const { id } = req.params;
    db.query(
        'UPDATE pagamentos SET morador_id = ?, referencia_id = ?, data_pagamento = ?, valor_pago = ? WHERE id = ?',
        [morador_id, referencia_id, data_pagamento, valor_pago, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.sendStatus(200);
        }
    );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM pagamentos WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

module.exports = router;
