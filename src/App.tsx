import Header from "./components/Header";
import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";

import { useBudget } from "./hooks/useBudget";
import { useEffect, useMemo } from "react";
import ExpenseList from "./components/ExpenseList";
import FilterByCatagory from "./components/FilterByCatagory";

export default function App() {
  const { state } = useBudget();
  const thereIsBudget = useMemo(() => state.budget > 0, [state.budget]);

  // Guardar el presupuesto y los gastos en el local storage
  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state]);

  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {thereIsBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {thereIsBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCatagory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}
