import { v4 as uuidv4 } from "uuid";
import type { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "switch-modal"; payload: { openModal: boolean } }
  | { type: "add-expense"; payload: { expense: DraftExpense } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
};

//Validations
const createExpense = (expense: DraftExpense): Expense => ({
  ...expense,
  id: uuidv4(),
});

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
    };
  }

  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false,
    };
  }

  return state;
}
