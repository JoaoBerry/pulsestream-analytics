const express = require('express');
const router = express.Router();
const metricController = require('../controllers/metricController');

// Quando receber um POST em /metrics, chama a função de criar
router.post('/metrics', metricController.createMetric);

// Quando receber um GET em /metrics, chama a função de buscar
router.get('/metrics', metricController.getAllMetrics);

module.exports = router;