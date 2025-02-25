const express = require("express"); // puxando a extensão do "node express"

// basicamente criando um servidor usando esse express
const app = express();
const port = 3000;

const path = require("path"); //nativo, n precisa instalar

// um redirecionamento para a pagina index.html
app.get("/", (req, res) => {
  // na linha acima é configurado o endereço para acessar essa rota e abaixo a resposta do Node para tal

  // é possivel criar outras rotas para outras paginas, porém é interessante redirecionar para outro arquivo como é o caso aqui
  res.sendFile(path.join(__dirname, "index.html"));
});

// Mensagem para indicar que o Back está rodando
app.listen(port, () => {
  console.log("Servidor rodando.");
});
