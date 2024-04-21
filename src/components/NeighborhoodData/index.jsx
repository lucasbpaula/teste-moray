/* eslint-disable react/prop-types */
import { formatPtBrNumber } from "./../../utils/formatters";
import { calculatePercDiff } from "../../utils/functions";
import "./styles.scss";

function NeighborhoodData({
  selectedNeighborhood: {
    featureProperties: { name, setor, zona },
    arrayPopulation,
  },
  closePopUpCallback,
}) {
  return arrayPopulation?.length > 0 ? (
    <div className="container">
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

      <ul className="list">
        {arrayPopulation?.map((item, index) => (
          <li key={index} className="item-list">
            <strong>{item?.ano}</strong>
            <p>
              População: {formatPtBrNumber(item?.populacao)}
              {index !== 0
                ? calculatePercDiff(
                    arrayPopulation[index - 1]?.populacao,
                    item?.populacao
                  )
                : null}
            </p>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}

export default NeighborhoodData;
