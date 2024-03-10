import { Movement } from "./types";

export const formatter = new Intl.NumberFormat("co-CO", {
  style: "currency",
  currency: "COP",
});

export function convertToMovement(jsonString: string): Movement[] {
  const tempArray = JSON.parse(jsonString) as { date: string; value: number }[];

  const movements = tempArray.map((tempObj) => ({
    date: new Date(tempObj.date),
    value: tempObj.value,
  }));

  return movements;
}
