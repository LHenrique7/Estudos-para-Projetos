async function connect() {
  if (global.connection) {
    return global.connection.connect(); // Caso ja tenha uma conexão criada e armazenada la no global é liberada a conexão sem a necessidade de criá-la novamente
  }

  const { Pool } = require("pg"); //Pegando só a classe "Pool" da biblioteca que vai ser usada para fazer a conexão
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING, // Setando a string la do .env para estabelecer a conexão
  });

  const client = await pool.connect(); // Realmente conectando ao banco
  console.log("Conexão criada");

  //TESTE DE CONEXÂO
  const res = await client.query("select now()"); // Fazendo uma requisão da hora do bdd só para teste
  console.log(res.rows[0]); //exibindo o resultado
  client.release(); // Liberando conexão

  global.connection = pool; // Guardando uma variavel global da aplicação que vai conter aquela const la de cima da string de conexão
  return pool.connect();
}

connect();

// Exemplos de uma funções CRUD para mexer com o banco de dados
async function selectCustomers() {
  const client = await connect(); // Antes de qualquer coisa solicita uma conexão
  const res = await client.query("SELECT * FROM Clientes;"); // Comando usado para mandar algum comando para o banco
  return res.rows; //Retornando um array de linhas com os resultados
}

async function selectCustomer(id) {
  const client = await connect();
  const res = await client.query("SELECT * FROM Clientes WHERE ID=$1", [id]); // Forma de passar parametros sem correr risco de sql injection
  return res.rows;
}

async function insertCustomer(customer) {
  const client = await connect();
  const sql =
    "INSERT INTO Clientes(nome, idade, genero, salario) VALUES ($1, $2, $3, $4)";
  const values = [
    customer.nome,
    customer.idade,
    customer.genero,
    customer.salario,
  ];
  await client.query(sql, values);
}

async function updateCustomer(id, customer) {
  const client = await connect();
  const sql =
    "UPDATE Clientes SET nome=$1, idade=$2, genero=$3, salario=$4 WHERE id=$5";
  const values = [
    customer.nome,
    customer.idade,
    customer.genero,
    customer.salario,
    id,
  ];
  await client.query(sql, values);
}

async function deleteCustomer(id) {
  const client = await connect();
  const sql = "DELETE FROM Clientes WHERE id=$1";
  const values = [id];
  await client.query(sql, values);
}

module.exports = {
  selectCustomers,
  selectCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
