import { format } from "date-fns";
import React, { useState } from "react";
import { useTabContext } from "../../hooks/useTab";
import { Movement } from "../../types";
import { Button } from "../Button";
import { Input } from "../Input";
import styles from "./Form.module.css";
import { generateRandomId } from "../../utils";

export type FormProps = {
  // types...
};

const Form: React.FC<FormProps> = () => {
  const { addMovement } = useTabContext();
  const [ActualDate, setActualDate] = useState(() =>
    format(new Date(), "yyyy-MM-dd")
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const date = formData.get("date") as string;
    const value = formData.get("value") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const inputDate = new Date(date);
    const fixedDate = new Date(
      inputDate.getTime() + inputDate.getTimezoneOffset() * 60000
    );

    const movement: Movement = {
      id: generateRandomId(),
      date: fixedDate,
      value: Number(value),
      type: type,
      description: description,
    };

    addMovement(type, movement);
    form.reset();
    setActualDate(format(new Date(), "yyyy-MM-dd"));
  };
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <div className={styles.group}>
          <Input
            id="date"
            text="Fecha"
            name="date"
            type="date"
            fullwidth
            required
            value={ActualDate}
            onChange={(e) => setActualDate(e.target.value)}
          />
          <Input
            id="value"
            text="Monto"
            type="number"
            name="value"
            fullwidth
            required
            placeholder="$20.000"
            defaultValue="20000"
          />
        </div>
        <div className={styles.selectWrapper}>
          <label>
            Seleccionar tipo
            <select className={styles.select} name="type">
              <option value="income">Ingreso</option>
              <option value="expense">Gasto</option>
            </select>
          </label>
        </div>
        <Input
          id="description"
          text="Descripción"
          type="text"
          name="description"
          fullwidth
          required
          placeholder="Compra en la droguería"
          defaultValue="Restaurante"
        />
      </div>
      <Button
        text="Agregar"
        title="Agregar ingreso diario"
        type="submit"
        activeColor="#007BFF"
      />
    </form>
  );
};

export default Form;
