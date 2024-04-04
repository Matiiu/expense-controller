import { v4 as uuidv4 } from "uuid";
import type { Category, DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "switch-modal"; payload: { openModal: boolean } }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } }
  | { type: "reset-app" }
  | { type: "filter-category"; payload: { id: Category["id"] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currCategoty: Category["id"];
};

const initialBudget = (): number => {
  const budgetStr = localStorage.getItem("budget");
  return budgetStr ? +budgetStr : 0;
};

const initialExpenses = (): Expense[] => {
  const expensesStr = localStorage.getItem("expenses");
  return expensesStr ? JSON.parse(expensesStr) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingId: "",
  currCategoty: "",
};

export function budgetReducer(
  state: BudgetState = initialState,
  action: BudgetActions
) {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "switch-modal") {
    return {
      ...state,
      modal: action.payload.openModal,
      editingId: action.payload.openModal ? state.editingId : "", // Limpiar solo cuando openModal sea falso
    };
  }

  if (action.type === "add-expense") {
    let updateExpenses: Expense[] = [];
    if ("id" in action.payload.expense) {
      const changeExpense = action.payload.expense as Expense;
      updateExpenses = state.expenses.map((expense) =>
        expense.id === changeExpense.id ? changeExpense : expense
      );
    } else {
      updateExpenses = [
        ...state.expenses,
        { ...action.payload.expense, id: uuidv4() },
      ];
    }

    return {
      ...state,
      expenses: updateExpenses,
      modal: false,
      editingId: "",
    };
  }

  if (action.type === "remove-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload.id),
    };
  }

  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "reset-app") {
    // Eliminar la llave del local storage y restablecer los valores a sus valores iniciales
    localStorage.removeItem("expenses");
    localStorage.removeItem("budget");
    return {
      budget: 0,
      modal: false,
      expenses: [],
      editingId: "",
      currCategoty: "",
    };
  }

  if (action.type === "filter-category") {
    return {
      ...state,
      currCategoty: action.payload.id,
    };
  }

  return state;
}
