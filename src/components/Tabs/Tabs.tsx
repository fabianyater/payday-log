import React from "react";
import { useTabContext } from "../../hooks/useTab";
import { Button } from "../Button";
import styles from "./Tabs.module.css";

export type TabsProps = {
  // types...
};

const Tabs: React.FC<TabsProps> = () => {
  const { activeTab, handleTabClick } = useTabContext();

  return (
    <section className={styles.tabs}>
      <Button
        text="Ingresos"
        size="sm"
        isActive={activeTab === "Ingresos"}
        onClick={() => handleTabClick("Ingresos")}
      />
      <Button
        text="Retiros"
        size="sm"
        isActive={activeTab === "Retiros"}
        onClick={() => handleTabClick("Retiros")}
      />
    </section>
  );
};

export default Tabs;
