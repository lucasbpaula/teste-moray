/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import NeighborhoodData from "./../../components/NeighborhoodData/index";
import { act } from "react-dom/test-utils";

describe("NeighborhoodData", () => {
  const mockProperties = {
    selectedNeighborhood: {
      featureProperties: { name: "name", setor: "setor", zona: "zona" },
      arrayPopulation: [
        {
          id_geometria: 1,
          ano: "2000",
          populacao: 11567,
        },
      ],
    },
    closePopUpCallback: () => {},
  };

  beforeEach(() => {
    act(() => {
      render(<NeighborhoodData {...mockProperties} />);
    });
  });

  test("Should be able to render component", () => {
    expect(screen.getByTestId("neighborhoodData")).toBeInTheDocument();
  });

  test("Should be able to see the features properties on screen", () => {
    const { name, setor, zona } =
      mockProperties.selectedNeighborhood.featureProperties;

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(setor)).toBeInTheDocument();
    expect(screen.getByText(zona)).toBeInTheDocument();
  });
});
