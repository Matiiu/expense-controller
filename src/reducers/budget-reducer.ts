export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "switch-modal", payload: { openModal: boolean } }

export type BudgetState = {
  budget: number;
  modal: boolean;
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
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
    };
  }

  return state;
}
