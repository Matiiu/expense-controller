import { useState, KeyboardEvent, ChangeEvent, FormEvent } from "react";

import { categories } from "../data/categories";

import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";

import type { DraftExpense, Value } from "../types";
import ErrorMsg from "./ErrorMsg";

import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });
  const [error, setError] = useState("");
  const { dispatch } = useBudget();

  const handleOnlynumbers = (e: KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = e.key;
    const isNumber = !isNaN(parseInt(keyPressed));
    !isNumber && e.preventDefault();
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  type HandleChange = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

  const handleChange = (e: HandleChange) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: name !== "amount" ? value : +value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validamos si alguno de los campos está vacío
    const fieldEmpty = Object.values(expense).some((value) => !value);

    if (fieldEmpty) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // Agregar un nuevo gasto
    dispatch({ type: "add-expense", payload: { expense } });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 pt-2">
        Nuevo Gasto
      </legend>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          name="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2 rounded-lg"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Añade la cantidad del gasto: ej. 300"
          className="bg-slate-100 p-2 rounded-lg"
          min={0}
          onKeyPress={handleOnlynumbers}
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>
        <select
          id="category"
          name="category"
          className="bg-slate-100 p-2 rounded-lg"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="" hidden>
            -- Seleccione --
          </option>
          {categories.map((categoty) => (
            <option key={categoty.id} value={categoty.id}>
              {categoty.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          id="date"
          name="date"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value="Registrar Gastos"
      />
    </form>
  );
}
