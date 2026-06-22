const categorias = ['Eletrônicos', 'Roupas', 'Livros', 'Casa'];
const produtos = {
  'Eletrônicos': ['Teclado Mecânico', 'Mouse Gamer', 'Monitor 4K'],
  'Roupas': ['Camiseta Oversized', 'Calça Cargo', 'Tênis Casual'],
  'Livros': ['Clean Code', 'Algoritmos', 'O Hobbit'],
  'Casa': ['Luminária Smart', 'Cafeteira Express', 'Almofada']
};

async function enviarCliqueFalso() {
  const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
  const listaProdutos = produtos[categoriaAleatoria];
  const produtoAleatorio = listaProdutos[Math.floor(Math.random() * listaProdutos.length)];

  const payload = {
    produto: produtoAleatorio,
    categoria: categoriaAleatoria
  };

  try {
    const response = await fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      console.log(`⚡ Simulador enviou: ${produtoAleatorio} (${categoriaAleatoria})`);
    }
  } catch (error) {
    console.error('❌ Erro ao conectar com a API. O servidor está rodando?');
  }
}

console.log('🤖 Simulador de Tráfego Iniciado...');
// Envia um clique a cada 1.5 segundos
setInterval(enviarCliqueFalso, 1500);