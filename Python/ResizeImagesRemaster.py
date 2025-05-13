import cv2
import numpy as np
from tkinter import Tk
from tkinter.filedialog import askopenfilename

# Upload da Imagem abrindo o explorador de arquivos
# Oculta a janela principal do Tkinter
Tk().withdraw()

# Abre o explorador de arquivos para escolher uma imagem
caminho_imagem = askopenfilename(
    title="Selecione uma imagem",
    filetypes=[("Imagens", "*.png *.jpg *.jpeg")]
)

# Guardar a imagem na variável
img = cv2.imread(caminho_imagem)

# Exibir a imagem original
cv2.imshow("Imagem Original:", img)

# Redimensionar para um tamanho menor (metade do tamanho original)
altura, largura = img.shape[:2]
nova_largura_menor = int(largura * 0.5)
nova_altura_menor = int(altura * 0.5)
img_menor = cv2.resize(img, (nova_largura_menor, nova_altura_menor))

# Exibir a imagem redimensionada (menor)
cv2.imshow("Imagem Redimensionada (Menor):", img_menor)

# Redimensionar para um tamanho maior (dobro do tamanho original)
nova_largura_maior = int(largura * 2)
nova_altura_maior = int(altura * 2)
img_maior = cv2.resize(img, (nova_largura_maior, nova_altura_maior))

# Exibir a imagem redimensionada (maior)
cv2.imshow("Imagem Redimensionada (Maior):", img_maior)

# Espera o usuário pressionar uma tecla e fecha as janelas
cv2.waitKey(0)
cv2.destroyAllWindows()