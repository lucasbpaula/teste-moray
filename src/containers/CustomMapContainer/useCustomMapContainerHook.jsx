import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export function useCustomMapContainerHook() {
  const [geojson, setGeojson] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [neighborhoodPopulation, setNeighborhoodPopulation] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState({
    featureProperties: {},
    arrayPopulation: [],
  });

  const fetchNeighborhoodData = useCallback(async () => {
    const neighborData = await axios("/bairros-geojson");

    setGeojson(neighborData?.data);
  }, []);

  const fetchPopulationData = useCallback(async () => {
    const populationData = await axios("/populacao");

    setNeighborhoodPopulation(populationData?.data);
  }, []);

  const closePopUpCallback = () => {
    setShowPopup(false);
  };

  const handleClick = ({ properties }) => {
    const filteredPopulation = neighborhoodPopulation.filter(
      (item) => item?.id_geometria === properties?.id
    );

    setSelectedNeighborhood({
      featureProperties: properties,
      arrayPopulation: filteredPopulation,
    });
    setShowPopup(true);
  };

  const onEachFeature = (feature, layer) => {
    // Verifica se existe a propriedade name para adicionar uma popup com o nome do bairro.
    if (feature.properties && feature.properties.name) {
      const randomColor = "hsl(" + Math.random() * 360 + ", 65%, 70%)";

      // Altera a cor da layer para uma cor aleatoria
      layer.options.color = randomColor;

      layer.on("mouseover", function (e) {
        this.bindPopup(feature.properties.name).openPopup(e.latlng);
      });

      layer.on("mousemove", function (e) {
        this.getPopup().setLatLng(e.latlng);
      });

      layer.on("mouseout", function () {
        this.closePopup();
      });
    }
  };

  useEffect(() => {
    fetchNeighborhoodData();
    fetchPopulationData();
  }, []);

  return {
    closePopUpCallback,
    handleClick,
    geojson,
    onEachFeature,
    selectedNeighborhood,
    showPopup,
  };
}
