import { format } from "date-fns";
import { es } from "date-fns/locale";
import React from "react";
import { useTabContext } from "../../hooks/useTab";
import { Movement } from "../../types";
import { formatter } from "../../utils";
import { Button } from "../Button";
import { IncomeIcon } from "../SvgIcon/SvgIcon";
import { UploadFileInput } from "../UploadFileInput";
import styles from "./Section.module.css";

export type SectionProps = {
  title: string;
  sectionName: string;
  data?: Movement[];
};

const Section: React.FC<SectionProps> = ({ title, sectionName, data = [] }) => {
  const { withdraw } = useTabContext();
  const sortedAndGroupedData = data.reduce<Record<string, Movement[]>>(
    (acc, item) => {
      const monthYearKey = format(new Date(item.date), "MMMM yyyy", {
        locale: es,
      });
      acc[monthYearKey] = acc[monthYearKey] || [];
      acc[monthYearKey].push(item);
      return acc;
    },
    {}
  );

  const sortedKeys = Object.keys(sortedAndGroupedData);

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <UploadFileInput tab={sectionName} />
      </header>
      {sectionName === "Retiros" && (
        <Button
          text="Retirar"
          title="Hacer retiro"
          type="button"
          size="sm"
          onClick={withdraw}
        />
      )}
      <ul className={styles.list}>
        {sortedKeys.map((monthYear) => (
          <details
            key={monthYear}
            className={`${styles.monthGroup} ${styles.details}`}
            name="month"
            open
          >
            <summary>
              <h3 className={styles.monthTitle}>{monthYear}</h3>
            </summary>
            <ul className={styles.monthList}>
              {sortedAndGroupedData[monthYear]
                .map((movement, index) => (
                  <li key={index} className={styles.item}>
                    <div className={styles.icon}>
                      <IncomeIcon />
                    </div>
                    <div className={styles.content}>
                      <span className={styles.dateText}>
                        {format(
                          new Date(movement.date),
                          "EEEE dd 'de' MMMM, yyyy",
                          {
                            locale: es,
                          }
                        )}
                      </span>
                      <span className={styles.valueText}>
                        {formatter.format(movement.value)}
                      </span>
                    </div>
                  </li>
                ))
                .reverse()}
            </ul>
          </details>
        )).reverse()}
        {data.length === 0 && <p>No hay datos para mostrar</p>}
      </ul>
    </section>
  );
};

export default Section;
