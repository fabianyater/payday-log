import { format } from "date-fns";
import { es } from "date-fns/locale";
import React from "react";
import { useTabContext } from "../../hooks/useTab";
import { Movement } from "../../types";
import { formatter } from "../../utils";
import { Button } from "../Button";
import { IncomeIcon } from "../SvgIcon/SvgIcon";
import styles from "./Section.module.css";
import { UploadFileInput } from "../UploadFileInput";

export type SectionProps = {
  title: string;
  sectionName: string;
  data?: Movement[];
};

const Section: React.FC<SectionProps> = ({ title, sectionName, data = [] }) => {
  const { withdraw } = useTabContext();
  const sortedData = data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
        {sortedData.length !== 0 ? (
          sortedData.map((data, index) => (
            <li key={index} className={styles.item}>
              <div className={styles.icon}>
                <IncomeIcon />
              </div>
              <div className={styles.content}>
                <span className={styles.dateText}>
                  {" "}
                  {format(data.date, "EEEE dd 'de' MMMM, yyyy", { locale: es })}
                </span>
                <span className={styles.valueText}>
                  {formatter.format(data.value)}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p>No hay datos para mostrar</p>
        )}
      </ul>
    </section>
  );
};

export default Section;
