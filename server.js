// 1. IMPORTAÇÃO DAS CONFIGURAÇÕES DO ARQUIVO SEGREDO (.env) - Deve ser a primeira linha!
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');

// Força o uso do DNS do Google para evitar bloqueios de operadoras brasileiras
dns.setServers(['8.8.8.8', '8.4.4.4']);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let usandoBancoNaNuvem = false;
let bancoLocalFallback = [];

// 2. LIGAR O SERVIDOR PRIMEIRO (Garante que a porta 3000 fique ativa imediatamente)
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  
  // 3. CONECTAR AO MONGO DB BUSCANDO A URL SEGRETA DO ARQUIVO .ENV
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.log('\n⚠️  Erro: A variável MONGO_URI não foi encontrada no arquivo .env!\n');
    console.log('Rodando em modo Emergência: Memória Local ativa.\n');
    usandoBancoNaNuvem = false;
    return;
  }

  mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      console.log('🍃 Conectado ao MongoDB com sucesso!');
      usandoBancoNaNuvem = true;
    })
    .catch(err => {
      console.log('\n⚠️  MongoDB offline ou lento. Rodando em modo Memória Local!\n');
      usandoBancoNaNuvem = false;
    });
});

// 4. Modelo do Banco de Dados
const CliqueSchema = new mongoose.Schema({
  produto: String,
  categoria: String,
  data: { type: Date, default: Date.now }
});
const Clique = mongoose.model('Clique', CliqueSchema);

// Rota 1: Recebe os cliques do simulador
app.post('/events', async (req, res) => {
  const { produto, categoria } = req.body;

  if (!produto || !categoria) {
    return res.status(400).json({ error: 'Dados inválidos!' });
  }

  try {
    if (usandoBancoNaNuvem) {
      const novoClique = new Clique({ produto, categoria });
      await novoClique.save();
      console.log(`[Nuvem - MongoDB] Salvo: ${produto}`);
    } else {
      bancoLocalFallback.push({ produto, categoria, data: new Date() });
      console.log(`[Memória Local] Salvo: ${produto}`);
    }
    return res.status(201).json({ message: 'Evento processado!' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar evento' });
  }
});

// Função auxiliar para calcular métricas de forma dinâmica
async function calcularMetricas() {
  const categories = ['Eletrônicos', 'Roupas', 'Livros', 'Casa'];
  let totalCliques = 0;
  let porCategoria = {};

  try {
    if (usandoBancoNaNuvem) {
      totalCliques = await Clique.countDocuments();
      for (let cat of categories) {
        porCategoria[cat] = await Clique.countDocuments({ categoria: cat });
      }
    } else {
      totalCliques = bancoLocalFallback.length;
      for (let cat of categories) {
        porCategoria[cat] = bancoLocalFallback.filter(c => c.categoria === cat).length;
      }
    }
    return { totalCliques, porCategoria };
  } catch (error) {
    return { totalCliques: 0, porCategoria: {} };
  }
}

// Rota 2: Consulta de Métricas Estáticas
app.get('/metrics', async (req, res) => {
  const metricas = await calcularMetricas();
  return res.json(metricas);
});

// Rota 3: Envia dados em tempo real via Server-Sent Events (SSE)
app.get('/live-metrics', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const enviarDados = async () => {
    const metricas = await calcularMetricas();
    res.write(`data: ${JSON.stringify(metricas)}\n\n`);
  };

  enviarDados();
  const intervalo = setInterval(enviarDados, 1000);

  req.on('close', () => {
    clearInterval(intervalo);
    res.end();
  });
});