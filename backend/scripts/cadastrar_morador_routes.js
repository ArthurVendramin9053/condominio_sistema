const express = require('express');
const router = express.Router();
const db = require('./db_connection');

router.post('/', (req, res) => {
  const {
    cpf, nome, telefone, apartamento, bloco,
    responsavel, proprietario, veiculo,
    vagas, numeroVaga, placa, marca, modelo
  } = req.body;

  if (!cpf || !nome || !telefone || !apartamento || !bloco) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const sql = `
    INSERT INTO moradores (
      cpf, nome, telefone, apartamento, bloco,
      responsavel, proprietario, veiculo,
      vagas, numero_vaga, placa, marca, modelo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    cpf, nome, telefone, apartamento, bloco,
    responsavel, proprietario, veiculo,
    vagas || null, numeroVaga || null, placa || null, marca || null, modelo || null
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar morador:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar morador.' });
    }

    res.status(201).json({ message: 'Morador cadastrado com sucesso!' });
  });
});

module.exports = router;
