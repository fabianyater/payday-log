import React, { ReactNode, createContext, useEffect, useState } from "react";
import { Movement } from "../types";

type TabContextType = {
  activeTab: string;
  total: number;
  workedDays: string;
  handleTabClick: (tabName: string) => void;
  addMovement: (type: string, movement: Movement) => void;
  withdraw: () => void;
  getMovements: (type: string) => Movement[];
  updateData: (type: string, data: Movement[]) => void;
};

export const TabContext = createContext<TabContextType | undefined>(undefined);

type TabProviderProps = {
  children: ReactNode;
};

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>("Ingresos");
  const [total, setTotal] = useState<number>(0);
  const [workedDays, setWorkedDays] = useState<string>("0");
  const [incomes, setIncomes] = useState<Movement[]>(() => {
    const savedIncomes = localStorage.getItem("ingresos");
    return savedIncomes ? JSON.parse(savedIncomes) : [];
  });
  const [withdrawals, setWithdrawals] = useState<Movement[]>(() => {
    const savedwithdrawals = localStorage.getItem("retiros");
    return savedwithdrawals ? JSON.parse(savedwithdrawals) : [];
  });

  useEffect(() => {
    localStorage.setItem("ingresos", JSON.stringify(incomes));
    setTotal(incomes.reduce((total, income) => total + income.value, 0));
    setWorkedDays(incomes.length.toString());
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem("retiros", JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");

    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    localStorage.setItem("activeTab", tabName);
  };

  const addMovement = (type: string, movement: Movement) => {
    const movements = getMovements(type);
    const updatedMovements = [...movements, movement];
    localStorage.setItem(type, JSON.stringify(updatedMovements));
    setIncomes([...incomes, movement]);
  };

  const updateData = (type: string, data: Movement[]) => {
    if (type === "ingresos") {
      setIncomes(data);
    } else if (type === "retiros") {
      setWithdrawals(data);
    }
  };

  const withdraw = () => {
    const movements = getMovements("retiros");
    const withdrawValue = incomes.reduce(
      (total, income) => total + income.value,
      0
    );
    const newWithdraw: Movement = {
      date: new Date(),
      value: withdrawValue,
    };

    const updatedMovements = [...movements, newWithdraw];
    localStorage.setItem("retiros", JSON.stringify(updatedMovements));
    setWithdrawals([...withdrawals, newWithdraw]);
  };

  const getMovements = (type: string): Movement[] => {
    const movements = type === "ingresos" ? incomes : withdrawals;
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
        withdraw,
        getMovements,
        updateData,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};