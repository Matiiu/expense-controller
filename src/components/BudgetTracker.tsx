import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useBudget } from "../hooks/useBudget";

import AmountDisplay from "./AmountDisplay";
import { useMemo } from "react";

export default function BudgetTracker() {
  const { budgetSpent, budgetAvailable, state, dispatch } = useBudget();

  const percentageSpent = useMemo(
    () => +((budgetSpent / state.budget) * 100).toFixed(2),
    [budgetSpent]
  );

  const porcentageStyle = useMemo(
    () =>
      percentageSpent < 51
        ? "#3b82f6"
        : percentageSpent >= 51 && percentageSpent <= 79
        ? "#F59E0B"
        : "#DC2626",
    [budgetSpent]
  );

  const handleResetApp = () => {
    const confirmReset = window.confirm(
      "¿Estás seguro de que deseas resetear la aplicación y perder todos los cambios?"
    );
    confirmReset && dispatch({ type: "reset-app" });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
      <figure className="flex justify-center">
        <CircularProgressbar
          value={+percentageSpent}
          styles={buildStyles({
            pathColor: porcentageStyle,
            trailColor: "#f5f5f5",
            textSize: 9,
            textColor: porcentageStyle,
          })}
          text={`${percentageSpent}% Gastado`}
        />
      </figure>

      <div className="flex flex-col justify-center gap-8">
        <button
          type="button"
          className="bg-pink-600 hover:bg-pink-700 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={handleResetApp}
        >
          Resetear App
        </button>

        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Gastado" amount={budgetSpent} />
        <AmountDisplay label="Disponible" amount={budgetAvailable} />
      </div>
    </div>
  );
}
