# Arquivo de teste que baixa o banco de dados MNIST salva nas variáveis e separa as imagens de treino e teste

from sklearn.datasets import fetch_openml   # Para conseguir baixar o banco
from sklearn.model_selection import train_test_split    # Para separar automaticamente o q é teste e o q é treino

# Baixando o banco
mnist = fetch_openml('mnist_784', version=1)

# guardando nas variáveis o array das imagens e também os rótulos
X = mnist.data.astype('float32')
y = mnist.target.astype('int')

# Separando imagens de treino e de teste 
X_train, x_test, Y_train, y_test = train_test_split(
    X, y, test_size=10000, random_state = 1, stratify = y
) 
# test_size refere o numero de imagens que vão ser de teste
# random_state serve para que sempre que o codigo rodar tenha a mesma separação entre as imagens (util para ver se os resultados melhoraram)
# stratify serve para separar as imagens de uma maneira proporcional, ter varios numeros no teste

#printing the shapes of the vectors 
print('X_train: ' + str(X_train .shape))
print('Y_train: ' + str(Y_train.shape))
print('X_test:  '  + str(x_test.shape))
print('Y_test:  '  + str(y_test.shape))