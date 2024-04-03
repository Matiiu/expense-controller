import Header from "./components/Header";
import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";

import { useBudget } from "./hooks/useBudget";
import { useMemo } from "react";

export default function App() {
  const { state } = useBudget();
  const thereIsBudget = useMemo(() => state.budget > 0, [state.budget]);

  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {thereIsBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {thereIsBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseModal />
        </main>
      )}
    </>
  );
}
