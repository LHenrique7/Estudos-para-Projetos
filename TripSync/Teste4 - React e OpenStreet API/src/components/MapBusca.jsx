import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Componente para atualizar a posição do mapa
function SetViewOnSearch({ position }) {
  const map = useMap(); // Obtém a referência ao mapa
  map.setView(position, 13); // Move o mapa para a posição buscada
  return null;
}

export default function MapBusca() {
  const [position, setPosition] = useState([-23.55052, -46.633308]); // São Paulo como posição inicial
  const [search, setSearch] = useState(""); // Estado para armazenar o texto da busca

  // Função para buscar coordenadas do endereço
  const handleSearch = async () => {
    if (!search) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0]; // Obtém latitude e longitude do primeiro resultado
        setPosition([parseFloat(lat), parseFloat(lon)]); // Atualiza a posição no estado
      } else {
        alert("Endereço não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Mapa com Busca de Endereço</h1>

      {/* Barra de pesquisa */}
      <div className="flex w-full max-w-lg mb-4">
        <input
          type="text"
          placeholder="Digite um endereço..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      {/* Mapa */}
      <div className="w-full max-w-4xl h-[400px] bg-white shadow-lg rounded-lg">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }} // Define uma altura e largura fixa para o mapa
          className="h-96 w-full rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Localização encontrada</Popup>
          </Marker>
          <SetViewOnSearch position={position} />{" "}
          {/* Atualiza a visualização do mapa */}
        </MapContainer>
      </div>
    </div>
  );
}
