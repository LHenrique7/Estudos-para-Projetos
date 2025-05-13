require("dotenv").config(); // puxa as config setadas em ".env"

const db = require("./db"); // Carregando o arquivo db que tem a conexão

const port = process.env.PORT; // basicamente atribui a confi PORT la do .env para a constante

const express = require("express"); // express para o Back-End

const app = express(); // iniciando express

app.use(express.json); // Configurando o Back-End para receber dados Json

// Setando ROTAS do CRUD:

// Rota de confirmação de que o backta funcionando
app.get("/", (req, res) => {
  res.json({
    message: "funcionando ",
  });
});

// Rota para trazer informações do banco de um determinado cliente usando seu ID e sem correr risco de SQL Injection
app.get("/clientes/:id", async (req, res) => {
  const cliente = await db.selectCustomer(req.params.id);
  res.json(cliente); // Envia os Dados em Json
});

// Rota para trazer as informações de todos os clientes do banco
app.get("/clientes", async (req, res) => {
  const clientes = await db.selectCustomers();
  res.json(clientes);
});

// Rota para a inserção de um cliente no banco, usando dados json passados por POST
app.post("/clientes", async (req, res) => {
  await db.insertCustomer(req.body); // Lembrar de mandar os dados em json do FRONT
  res.sendStatus(201); // Como não tem resposta a inserção, só é enviado um status de sucesso padrão de cadastro do HTTP
});

// Rota para atualizar dados de um cliente no banco
app.patch("/clientes/:id", async (req, res) => {
  await db.updateCustomer(req.params.id, req.body);
  res.sendStatus(200); // Envia um status de sucesso padrão de atualização do HTTP
});

// Rota para deletar dados de um cliente no banco
app.delete("/clientes/:id", async (req, res) => {
  await db.deleteCustomer(req.params.id);
  res.sendStatus(204); // Envia um status de sucesso padrão de delete do HTTP
});

app.listen(port); //atribuindo uma porta pra poder rodar o back-end

console.log("Back rodando..."); // Mensagem pra mostrar que ta rodando
