import styles from "./App.module.css";
import { Form } from "./components/Form";
import { Section } from "./components/Section";
import { Tabs } from "./components/Tabs";
import { Text } from "./components/Text";
import { useTabContext } from "./hooks/useTab";
import { formatter } from "./utils";

function App() {
  const { activeTab, total, workedDays, getMovements } = useTabContext();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Registro de ingresos</h1>
        <Text text="Total: " value={formatter.format(total)} />
        <Text text="Total días trabajados: " value={workedDays} />
      </header>
      <main>
        <section className={styles.formSection}>
          <Form />
        </section>

        <Tabs />
        {activeTab === "Ingresos" ? (
          <Section
            sectionName="Ingresos"
            title="Listado de Ingresos"
            data={getMovements("income")}
          />
        ) : (
          <Section
            title="Gastos"
            data={getMovements("expense")}
            sectionName="Gastos"
          />
        )}
      </main>
    </div>
  );
}

export default App;
