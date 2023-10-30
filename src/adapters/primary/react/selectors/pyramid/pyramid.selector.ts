import { AppState } from "../../../../../store/appState";
import { createSelector } from "@reduxjs/toolkit";

const selectStructure = (state: AppState) => state.pyramid.structure;
const selectCurrentValue = (state: AppState) => state.pyramid.currentValue;

export const selectPyramid = createSelector(
  [selectStructure, selectCurrentValue],
  (structure, currentValue) => {
    return {
      structure: [...structure].reverse().map((value) => {
        const formattedValue = formatValue(value);
        return `${formattedValue} €`;
      }),
      currentValue: `${formatValue(currentValue)} €`,
    };
  }
);

const formatValue = (value: number) =>
  value === 1000000
    ? "1 MILLION"
    : value.toLocaleString("en-US").replaceAll(",", ".");
