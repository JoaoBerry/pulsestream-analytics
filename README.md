# PulseStream Analytics 🚀

Uma plataforma fullstack de monitoramento e análise de métricas de streaming em tempo real. O sistema simula a coleta de dados de múltiplos dispositivos, processa as informações através de uma API RESTful estruturada e renderiza gráficos dinâmicos em um dashboard interativo.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, Tailwind CSS, JavaScript (ES6+), Chart.js
- **Backend:** Node.js, Express
- **Banco de Dados:** MongoDB, Mongoose (Object Data Modeling)
- **Simulação:** Worker assíncrono nativo (Node.js)

## 📂 Arquitetura do Projeto

O backend foi desenvolvido seguindo boas práticas de engenharia de software, utilizando uma arquitetura em camadas (baseada no padrão MVC) para garantir a separação de conceitos, testabilidade e manutenibilidade do código:

- `src/config/`: Isolamento da lógica de conexão com o banco de dados.
- `src/controllers/`: Regras de negócio e tratamento das requisições.
- `src/models/`: Definição de Schemas e validação do MongoDB.
- `src/routes/`: Mapeamento e exposição dos endpoints da API.
- `index.html`: Dashboard interativo (Frontend).
- `server.js`: Ponto de entrada (Inicialização da API).
- `simulator.js`: Script worker (Simulador de carga em segundo plano).

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
Instalar o Node.js e possuir uma instância do MongoDB (Local ou Atlas).

### Passo a Passo

1. **Clone o repositório:**
   git clone https://github.com/JoaoBerry/pulsestream-analytics.git

2. **Entre na pasta do projeto:**
   cd pulsestream-analytics

3. **Instale as dependências necessárias:**
   npm install

4. **Configure as Variáveis de Ambiente:**
   Crie um arquivo chamado `.env` na raiz do projeto e adicione a sua string de conexão com o banco de dados:
   MONGO_URI=sua_string_de_conexao_do_mongodb
   PORT=3000

5. **Inicie a API (Backend):**
   node server.js
   
   Você verá as confirmações de inicialização e conexão com o MongoDB no terminal.

6. **Inicie o Simulador de Dados (Worker):**
   Abra uma nova aba ou janela de terminal paralela e execute:
   node simulator.js
   
   O simulador começará a enviar dados para a API a cada 3 segundos.

7. **Abra o Dashboard (Frontend):**
   Abra o arquivo `index.html` no seu navegador de preferência. Para uma melhor experiência de desenvolvimento, recomenda-se usar a extensão Live Server dentro do VS Code.

## 🧠 Aprendizados Fundamentais

Desenvolver este projeto me permitiu consolidar conceitos práticos importantes do terceiro semestre de Ciência da Computação:
- **Modularização e Clean Code:** Divisão clara de responsabilidades entre rotas, controladores e modelos, evitando o acúmulo de código acoplado em um único arquivo principal.
- **Sistemas Distribuídos e Concorrência:** Gerenciamento de processos paralelos de forma assíncrona, onde um worker atua de maneira independente gerando carga, enquanto a API gerencia requisições e conexões de rede simultaneamente.
- **Persistência de Dados e Modelagem:** Manipulação de bancos NoSQL através do Mongoose, aplicando validações, índices de busca eficientes e tipagem de dados estruturados.
- **Consumo de APIs e DOM Dinâmico:** Atualização visual reativa no frontend consumindo dados no formato JSON, integrando com bibliotecas de renderização de gráficos (Chart.js) sem a necessidade de recarregar a interface.