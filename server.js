const express = require('express');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

const connectDB = require('./src/config/db');
// 1. IMPORTA AS ROTAS AQUI
const metricRoutes = require('./src/routes/metricRoutes');

dns.setServers(['8.8.8.8', '8.4.4.4']);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectDB();

// 2. ATIVA AS ROTAS DA API COM O PREFIXO '/api'
app.use('/api', metricRoutes);

// O seu simulador agora vai enviar dados para: http://localhost:3000/api/metrics

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});