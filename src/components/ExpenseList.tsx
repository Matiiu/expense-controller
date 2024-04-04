import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { state } = useBudget();

  const filterExpense = state.currCategoty
    ? state.expenses.filter(
        (expense) => expense.category === state.currCategoty
      )
    : state.expenses;

  const thereAreExpenses = useMemo(
    () => filterExpense.length > 0,
    [filterExpense]
  );

  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
      {thereAreExpenses ? (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">
            Listado De Gastos
          </p>
          {filterExpense.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      ) : (
        <p className="text-gray-600 text-2xl font-bold">No hay Gastos</p>
      )}
    </div>
  );
}
