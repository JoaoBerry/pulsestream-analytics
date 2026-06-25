// Função para gerar dados simulados de streaming
function gerarMetricasAleatorias() {
    const dispositivos = ['SmartTV-Sala', 'iPhone-Joao', 'WebBrowser-Chrome', 'PlayStation5'];
    const statusOpcoes = ['stable', 'warning', 'critical'];
    
    // Escolhe um dispositivo aleatório da lista
    const deviceId = dispositivos[Math.floor(Math.random() * dispositivos.length)];
    
    // Gera dados realistas: bitrate entre 1000kbps e 8000kbps
    const bitrate = Math.floor(Math.random() * (8000 - 1000 + 1)) + 1000;
    
    // Na maior parte do tempo o buffering é 0, mas às vezes acontece um mini travamento
    const bufferingTime = Math.random() > 0.85 ? Math.floor(Math.random() * 5) + 1 : 0;
    
    // Define o status com base no buffering
    let status = 'stable';
    if (bufferingTime > 3) {
        status = 'critical';
    } else if (bufferingTime > 0) {
        status = 'warning';
    }

    return {
        deviceId,
        bitrate,
        bufferingTime,
        status
    };
}

// Função que envia os dados para a nossa API via POST
async function enviarDadosParaAPI() {
    const dados = gerarMetricasAleatorias();
    
    try {
        const response = await fetch('http://localhost:3000/api/metrics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            const resultado = await response.json();
            console.log(`✅ [Simulador] Dados enviados com sucesso para o banco! ID: ${resultado._id}`);
        } else {
            console.error(`❌ [Simulador] Erro na API: ${response.statusText}`);
        }
    } catch (error) {
        console.error('❌ [Simulador] Não foi possível conectar à API. O servidor está ligado?', error.message);
    }
}

// Inicializa o simulador para rodar a cada 3 segundos (3000 milissegundos)
console.log('🚀 Simulador de Analytics iniciado... Pressione Ctrl + C para parar.');
setInterval(enviarDadosParaAPI, 3000);