import { v4 as uuidv4 } from "uuid";
import type { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "switch-modal"; payload: { openModal: boolean } }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
  editingId: "",
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
      editingId: !action.payload.openModal && "", // Limpiar solo cuando openModal sea falso,
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

  return state;
}
