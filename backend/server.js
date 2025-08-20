const express = require('express');
const cors = require('cors');
const blocosRoutes = require('./scripts/cadastrar_manutencao_routes');
const apartamentosRoutes = require('./scripts/cadastrar_apartamentos_routes');
const moradoresRoutes = require('./scripts/manter_blocos_routes');
const pagamentosRoutes = require('./scripts/pesquisar_apartamentos_routes');
const tiposManutencaoRoutes = require('./scripts/pesquisar_blocos_routes');
const manutencoesRealizadasRoutes = require('./scripts/cadastrar_morador_routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/blocos', blocosRoutes);
app.use('/api/apartamentos', apartamentosRoutes);
app.use('/api/moradores', moradoresRoutes);
app.use('/api/pagamentos', pagamentosRoutes);
app.use('/api/tipos-manutencao', tiposManutencaoRoutes);
app.use('/api/manutencoes-realizadas', manutencoesRealizadasRoutes);

app.listen(3000);
