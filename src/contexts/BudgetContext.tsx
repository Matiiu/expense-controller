import { useReducer, useMemo, createContext, Dispatch, ReactNode } from "react";
import {
  budgetReducer,
  initialState,
  BudgetState,
  BudgetActions,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  budgetSpent: number;
  budgetAvailable: number;
};

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export function BudgetProvider({ children }: BudgetProviderProps) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const budgetSpent = useMemo(
    () => state.expenses.reduce((acc, curr) => acc + curr.amount, 0),
    [state.expenses]
  );

  const budgetAvailable = useMemo(
    () => state.budget - budgetSpent,
    [state.expenses]
  );

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        budgetSpent,
        budgetAvailable,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}
