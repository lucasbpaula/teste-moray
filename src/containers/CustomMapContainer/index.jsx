import "leaflet/dist/leaflet.css";
import { GeoJSON } from "react-leaflet/GeoJSON";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useCustomMapContainerHook } from "./useCustomMapContainerHook";
import NeighborhoodData from "../../components/NeighborhoodData";
import { LayersControl } from "react-leaflet";

function CustomMapContainer() {
  const {
    closePopUpCallback,
    handleClick,
    geojson,
    onEachFeature,
    selectedNeighborhood,
    showPopup,
  } = useCustomMapContainerHook();

  return (
    <div data-testid="customMapContainer">
      <MapContainer
        style={{ height: "100vh" }}
        bounds={[
          [-23.234708, -45.928813],
          [-23.198917, -45.900761],
        ]}
        zoom={15}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BcCw9iWXRyBExU9XfTBr"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Zona Oeste">
            {/* Componente que renderiza as geometrias dos bairros */}
            {geojson && (
              <GeoJSON
                data={geojson}
                onEachFeature={onEachFeature}
                eventHandlers={{
                  click: (event) => {
                    // Quando o usuário clicar em um bairro no mapa, essa função será executada
                    handleClick(event.sourceTarget.feature);
                  },
                }}
              />
            )}
          </LayersControl.Overlay>
        </LayersControl>

        {showPopup ? (
          <NeighborhoodData
            selectedNeighborhood={selectedNeighborhood}
            closePopUpCallback={closePopUpCallback}
          />
        ) : null}
      </MapContainer>
    </div>
  );
}

export default CustomMapContainer;
