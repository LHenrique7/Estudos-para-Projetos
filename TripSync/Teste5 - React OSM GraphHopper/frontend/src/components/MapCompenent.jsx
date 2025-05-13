import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ícone padrão do Leaflet
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapComponent = ({ route, points }) => {
  if (!route || !points || points.length < 2) return <p>Carregando mapa...</p>;

  console.log("Pontos da rota:", points);

  return (
    <MapContainer
      center={points[0]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Linha da rota */}
      <Polyline positions={route} color="blue" />

      {/* Marcadores baseados nos pontos definidos no App.jsx */}
      <Marker position={points[0]} icon={customIcon}>
        <Popup>Origem: Pindamonhangaba (Moreira César)</Popup>
      </Marker>

      <Marker position={points[1]} icon={customIcon}>
        <Popup>Parada: Pindamonhangaba (Centro)</Popup>
      </Marker>

      <Marker position={points[2]} icon={customIcon}>
        <Popup>Destino: IFSP Campos do Jordão</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
