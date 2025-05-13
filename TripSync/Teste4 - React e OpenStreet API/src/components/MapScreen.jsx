import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Importa componentes do react-leaflet para exibir o mapa
import "leaflet/dist/leaflet.css"; // Importa o CSS necessário para exibir corretamente os mapas

export default function MapScreen() {
  // Define o componente funcional MapScreen
  const position = [-23.55052, -46.633308]; // Define a coordenada inicial (São Paulo)

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      {" "}
      {/* Container principal que ocupa toda a tela, centraliza o conteúdo e define fundo cinza claro */}
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        {" "}
        {/* Caixa branca centralizada com sombras e bordas arredondadas */}
        <h1 className="text-2xl font-bold mb-4 text-center">
          Mapa com OpenStreetMap
        </h1>{" "}
        {/* Título principal da página */}
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }} // Define uma altura e largura fixa para o mapa
          className="h-96 w-full rounded-lg"
        >
          {" "}
          {/* Componente principal do mapa, recebe a posição inicial e zoom */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Define a camada de tiles do OpenStreetMap
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // Atribuição obrigatória ao OpenStreetMap
          />
          <Marker position={position}>
            {" "}
            {/* Adiciona um marcador na posição inicial */}
            <Popup>
              {" "}
              {/* Define um pop-up que aparece ao clicar no marcador */}
              Localização inicial: São Paulo{" "}
              {/* Texto exibido dentro do pop-up */}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
