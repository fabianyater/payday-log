import { Movement } from "./types";

export const formatter = new Intl.NumberFormat("co-CO", {
  style: "currency",
  currency: "COP",
});

export function convertToMovement(jsonString: string): Movement[] {
  const tempArray = JSON.parse(jsonString) as {
    id: string;
    date: string;
    value: number;
    type: string;
    description?: string;
  }[];

  const movements = tempArray.map(
    ({ id, date, value, type, description = "No description" }) => ({
      id: id,
      date: new Date(date),
      value: value,
      type: type,
      description: description,
    })
  );

  return movements;
}

export const mapTabToName = (tabName: string): string => {
  switch (tabName) {
    case "Ingresos":
      return "income";
    case "Gastos":
      return "expense";
    default:
      return tabName.toLowerCase(); // O manejar de otra forma si es necesario
  }
};

export const generateRandomId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};
