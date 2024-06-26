import React, { ReactNode, createContext, useEffect, useState } from "react";
import { Movement } from "../types";
import { generateRandomId } from "../utils";

type TabContextType = {
  activeTab: string;
  total: number;
  workedDays: string;
  handleTabClick: (tabName: string) => void;
  addMovement: (type: string, movement: Movement) => void;
  getMovements: (type: string) => Movement[];
  updateData: (type: string, data: Movement[]) => void;
};

export const TabContext = createContext<TabContextType | undefined>(undefined);

type TabProviderProps = {
  children: ReactNode;
};

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>("Ingresos");
  const [total, setTotal] = useState<number>(() => {
    const savedTotal = localStorage.getItem("total");
    return savedTotal ? JSON.parse(savedTotal) : 0;
  });
  const [workedDays, setWorkedDays] = useState<string>("0");
  const [incomes, setIncomes] = useState<Movement[]>(() => {
    const savedIncomes = localStorage.getItem("income");
    return savedIncomes ? JSON.parse(savedIncomes) : [];
  });
  const [expenses, setexpenses] = useState<Movement[]>(() => {
    const savedexpenses = localStorage.getItem("expense");
    return savedexpenses ? JSON.parse(savedexpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(incomes));
    localStorage.setItem("total", total.toString());
    const totalWorkedDays = incomes.filter(
      (i) => i.description === "Restaurante"
    ).length;
    setWorkedDays(totalWorkedDays.toString());
  }, [incomes, total]);

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");

    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  useEffect(() => {
    const getTotal = localStorage.getItem("total") || 0;
    setTotal(Number(getTotal));
  }, []);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    localStorage.setItem("activeTab", tabName);
  };

  const addMovement = (type: string, movement: Movement) => {
    const movements = getMovements(type);

    if (type === "income") {
      movement.id = generateRandomId();
      const updatedMovements = [...movements, movement];
      setTotal(total + movement.value);
      localStorage.setItem(type, JSON.stringify(updatedMovements));
      setIncomes([...incomes, movement]);
    }

    if (type === "expense") {
      setTotal(total - movement.value);
      const updatedMovements = [...movements, movement];
      localStorage.setItem(type, JSON.stringify(updatedMovements));
      setexpenses([...expenses, movement]);
    }
  };

  const updateData = (type: string, data: Movement[]) => {
    const dataWithIds = data.map((movement) => ({
      ...movement,
      id: movement.id || generateRandomId(), // Asigna un ID solo si no existe
    }));

    if (type === "income") {
      setTotal(dataWithIds.reduce((total, income) => total + income.value, 0));
      setIncomes(dataWithIds);
    } else if (type === "expense") {
      setTotal(
        total -
          dataWithIds.reduce((total, withdraw) => total + withdraw.value, 0)
      );
      setexpenses(dataWithIds);
    }
  };

  const getMovements = (type: string): Movement[] => {
    const movements = type === "income" ? incomes : expenses;
    return movements ? movements : [];
  };

  return (
    <TabContext.Provider
      value={{
        activeTab,
        total,
        workedDays,
        handleTabClick,
        addMovement,
        getMovements,
        updateData,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};
