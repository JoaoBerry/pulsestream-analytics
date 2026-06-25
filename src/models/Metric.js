const mongoose = require('mongoose');

// Definindo a estrutura da tabela/coleção no banco
const MetricSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        index: true // Facilita a busca rápida no banco depois
    },
    bitrate: {
        type: Number,
        required: true
    },
    bufferingTime: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['stable', 'warning', 'critical'],
        default: 'stable'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Metric', MetricSchema);