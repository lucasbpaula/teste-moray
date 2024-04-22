/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCustomMapContainerHook } from "../../containers/CustomMapContainer/useCustomMapContainerHook";
import { act } from "@testing-library/react";

describe("useCustomMapContainerHook", () => {
  test("Should return mocked hooks value", () => {
    const { result } = renderHook(() => useCustomMapContainerHook());

    expect(result.current.geojson).toEqual(null);
    expect(result.current.selectedNeighborhood).toEqual(
      Object({
        featureProperties: {},
        arrayPopulation: [],
      })
    );
  });

  test("Should return hooks value after handleClick", () => {
    const { result } = renderHook(() => useCustomMapContainerHook());

    act(() =>
      result.current.handleClick({
        properties: {
          id: 2,
          name: "Jd. das Industrias",
          setor: "Jd. das Industrias",
          zona: "Oeste",
        },
      })
    );

    expect(result.current.selectedNeighborhood).toEqual({
      arrayPopulation: undefined,
      featureProperties: {
        id: 2,
        name: "Jd. das Industrias",
        setor: "Jd. das Industrias",
        zona: "Oeste",
      },
    });
  });

  test("Should return showPopup false value callback", () => {
    const { result } = renderHook(() => useCustomMapContainerHook());

    act(() => result.current.closePopUpCallback());

    expect(result.current.showPopup).toBeFalsy();
  });
});
