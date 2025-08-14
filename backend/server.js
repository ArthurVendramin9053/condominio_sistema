const express = require('express');
const cors = require('cors');
const blocosRoutes = require('./scripts/blocos_routes');
const apartamentosRoutes = require('./scripts/apartamentos_routes');
const moradoresRoutes = require('./scripts/moradores_routes');
const pagamentosRoutes = require('./scripts/pagamentos_routes');
const tiposManutencaoRoutes = require('./scripts/tipos_manutencao_routes');
const manutencoesRealizadasRoutes = require('./scripts/manutencoes_realizadas_routes');

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
