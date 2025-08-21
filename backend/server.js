const express = require('express');
const cors = require('cors'); // 👈 Adicionado
const app = express();
const port = 3000;

app.use(cors()); // 👈 Adicionado
app.use(express.json()); // 👈 Adicionado

const cadastrarApartamentoRoutes = require('./scripts/cadastrar_apartamentos_routes');
app.use('/api/apartamentos', cadastrarApartamentoRoutes);
const cadastrarManutencaoRoutes = require('./scripts/cadastrar_manutencao_routes');
app.use('/api/manutencoes', cadastrarManutencaoRoutes);
const cadastrarMoradorRoutes = require('./scripts/cadastrar_morador_routes');
app.use('/api/moradores', cadastrarMoradorRoutes);
const manterBlocosRoutes = require('./scripts/manter_blocos_routes');
app.use('/api/blocos', manterBlocosRoutes);
const pesquisarApartamentosRoutes = require('./scripts/pesquisar_apartamentos_routes');
app.use('/api/apartamentos', pesquisarApartamentosRoutes);
const pesquisarBlocosRoutes = require('./scripts/pesquisar_blocos_routes');
app.use('/api/blocos', pesquisarBlocosRoutes);
const realizarManutencaoRoutes = require('./scripts/realizar_manutencao_routes');
app.use('/api/manutencoes', realizarManutencaoRoutes);
const registrarPagamentosRoutes = require('./scripts/registrar_pagamentos_routes');
app.use('/api/pagamentos', registrarPagamentosRoutes);

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
