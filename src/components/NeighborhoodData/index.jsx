/* eslint-disable react/prop-types */
import { LineChart } from "@mui/x-charts/LineChart";
import { useMemo } from "react";
import "./styles.scss";

function NeighborhoodData({
  selectedNeighborhood: {
    featureProperties: { name, setor, zona },
    arrayPopulation,
  },
  closePopUpCallback,
}) {
  const dataSet = useMemo(() => {
    return arrayPopulation?.map((item) => {
      return {
        ano: item.ano,
        populacao: item.populacao,
      };
    });
  }, [arrayPopulation]);

  return arrayPopulation?.length > 0 ? (
    <div className="container" data-testid="neighborhoodData">
      <span className="close" onClick={closePopUpCallback} />
      <h3 className="name">{name}</h3>

      <div className="description">
        <p>
          <strong>Setor:</strong> {setor}
        </p>
        <p>
          <strong>Zona:</strong> {zona}
        </p>
      </div>

      <h4 className="titleChart">População/Ano</h4>

      <LineChart
        xAxis={[{ scaleType: "point", dataKey: "ano", label: "Ano" }]}
        series={[
          {
            dataKey: "populacao",
          },
        ]}
        dataset={dataSet}
        height={300}
        margin={{ right: 20 }}
      />
    </div>
  ) : null;
}

export default NeighborhoodData;
