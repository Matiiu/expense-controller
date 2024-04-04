import {
  useState,
  useMemo,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
} from "react";

import { useBudget } from "../hooks/useBudget";
import ErrorMsg from "./ErrorMsg";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
  const [error, setError] = useState("");
  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value);
  };

  const handleOnlynumbers = (e: KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = e.key;
    const isNumber = !isNaN(parseInt(keyPressed));
    !isNumber && e.preventDefault();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!budget) {
      setError("Debe ingresar un presupuesto");
      return;
    }
    dispatch({ type: "add-budget", payload: { budget } });
  };

  const disabeldBtn = useMemo(() => !budget, [budget]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
        <input
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          id="budget"
          name="budget"
          value={budget}
          min={0}
          onChange={handleChange}
          onKeyPress={handleOnlynumbers}
        />
      </div>

      <input
        type="submit"
        value="Definir Presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-10 disabled:cursor-auto"
        disabled={disabeldBtn}
      />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </form>
  );
}
