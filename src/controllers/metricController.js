const Metric = require('../models/Metric');

// Função para SALVAR uma nova métrica no banco (o simulador vai usar esta)
exports.createMetric = async (req, res) => {
    try {
        // Criamos uma nova instância do modelo com os dados que vieram na requisição (req.body)
        const newMetric = new Metric(req.body);
        
        // Salvamos no MongoDB
        const savedMetric = await newMetric.save();
        
        // Retornamos o status 201 (Created) e o objeto salvo
        return res.status(201).json(savedMetric);
    } catch (error) {
        // Se algo der errado (ex: faltar campo obrigatório), retorna erro
        return res.status(400).json({ error: error.message });
    }
};

// Função para BUSCAR as métricas (o frontend vai usar esta para gerar os gráficos)
exports.getAllMetrics = async (req, res) => {
    try {
        // Busca as últimas 100 métricas, ordenando da mais recente para a mais antiga
        const metrics = await Metric.find().sort({ timestamp: -1 }).limit(100);
        return res.status(200).json(metrics);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};