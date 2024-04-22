/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import CustomMapContainer from "./../../containers/CustomMapContainer/index";

vi.mock("axios");

describe("CustomMapContainer", () => {
  test("Should be able to render component", () => {
    vi.mock(
      "../../containers/CustomMapContainer/useCustomMapContainerHook",
      () => ({
        useCustomMapContainerHook: () => {
          return {
            closePopUpCallback: vi.fn(() => {}),
            handleClick: vi.fn(() => {}),
            geojson: undefined,
            onEachFeature: vi.fn(() => {}),
            selectedNeighborhood: {
              featureProperties: {},
              arrayPopulation: [],
            },
            showPopup: vi.fn(() => {}),
          };
        },
      })
    );

    const { getByTestId } = render(<CustomMapContainer />);
    expect(getByTestId("customMapContainer")).toBeInTheDocument();
  });
});
