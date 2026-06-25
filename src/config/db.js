const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.log('\n⚠️ Erro: A variável MONGO_URI não foi encontrada no arquivo .env!');
        console.log('Rodando em modo Emergência: Memória Local ativa.\n');
        return false;
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('🔌 MongoDB conectado com sucesso!');
        return true;
    } catch (error) {
        console.error('❌ Erro ao conectar ao MongoDB:', error.message);
        console.log('Rodando em modo Emergência: Memória Local ativa.\n');
        return false;
    }
};

module.exports = connectDB;