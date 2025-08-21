const express = require('express');
const router = express.Router();
const db = require('./db_connection');

// GET - Buscar moradores
router.get('/', (req, res) => {
  db.query('SELECT * FROM moradores', (err, results) => {
    if (err) {
      console.error('Erro ao buscar moradores:', err);
      return res.status(500).json({ error: 'Erro ao buscar moradores.' });
    }
    res.json(results);
  });
});

// POST - Cadastrar morador
router.post('/', (req, res) => {
  const {
    cpf, nome, telefone, apartamento, bloco,
    responsavel, proprietario, veiculo,
    vagas, numeroVaga, placa, marca, modelo
  } = req.body;

  if (!cpf || !nome || !telefone || !apartamento || !bloco) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const vagasInt = vagas ? parseInt(vagas) : null;

  const values = [
    cpf,
    nome,
    telefone,
    apartamento,
    bloco,
    responsavel || null,
    proprietario || null,
    veiculo || null,
    vagasInt,
    numeroVaga || null,
    placa || null,
    marca || null,
    modelo || null
  ];

  const sql = `
    INSERT INTO moradores (
      cpf, nome, telefone, apartamento, bloco,
      responsavel, proprietario, veiculo,
      vagas, numero_vaga, placa, marca, modelo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar morador:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar morador.' });
    }

    res.status(201).json({ message: 'Morador cadastrado com sucesso!' });
  });
});

module.exports = router;
