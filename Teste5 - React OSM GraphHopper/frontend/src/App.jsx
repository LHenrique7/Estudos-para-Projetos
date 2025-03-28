import { useState, useEffect, useMemo } from "react";
import MapComponent from "./components/MapCompenent.jsx";

function App() {
  const [route, setRoute] = useState(null);

  // Memoriza os pontos para evitar re-renderizações desnecessárias
  const points = useMemo(
    () => [
      [-22.891298, -45.390181], // Origem (Moreira César, Pindamonhangaba)
      [-22.932656, -45.461125], // Parada (Centro, Pindamonhangaba)
      [-22.742775, -45.592731], // Destino (IFSP Campos do Jordão)
    ],
    []
  );

  useEffect(() => {
    const fetchRoute = async () => {
      if (!points || points.length === 0) return; // Evita rodar sem os pontos

      const url = `http://localhost:8989/route?point=${points
        .map((p) => `${p[0]},${p[1]}`)
        .join("&point=")}&profile=car&instructions=false&points_encoded=false`;

      console.log("URL da requisição:", url);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.paths) {
          const newRoute = data.paths[0].points.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]);
          setRoute(newRoute);
        }
      } catch (error) {
        console.error("Erro ao buscar rota:", error);
      }
    };

    fetchRoute();
  }, [points]); // Agora 'points' está listado corretamente

  return (
    <div>
      <h1>Mapa com Rota</h1>
      <MapComponent route={route} points={points} />
    </div>
  );
}

export default App;
