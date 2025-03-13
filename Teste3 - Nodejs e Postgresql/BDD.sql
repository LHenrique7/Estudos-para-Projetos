CREATE TABLE IF NOT EXISTS Clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    genero CHAR(1) CHECK (genero IN ('M', 'F', 'O')), -- 'M' para masculino, 'F' para feminino, 'O' para outro
    salario DECIMAL(10,2) NOT NULL
);

INSERT INTO Clientes (nome, idade, genero, salario) VALUES
('Carlos Silva', 30, 'M', 3500.50),
('Ana Souza', 25, 'F', 4200.75),
('Mariana Oliveira', 40, 'F', 5200.00),
('João Pereira', 28, 'M', 3100.20),
('Alex Santos', 35, 'O', 4800.90);

SELECT * FROM Clientes
