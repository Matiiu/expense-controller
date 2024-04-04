import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import AmountDisplay from "./AmountDisplay";

import type { Expense } from "../types";
import { formatDate } from "../helpers";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { dispatch } = useBudget();

  const categotyInfo = useMemo(
    () => categories.filter(({ id }) => id === expense.category)[0],
    [expense]
  );

  const leadingActions = (id: Expense["id"]) => (
    <LeadingActions>
      <SwipeAction
        onClick={() => dispatch({ type: "get-expense-by-id", payload: { id } })}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (id: Expense["id"]) => (
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({ type: "remove-expense", payload: { id } })}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions(expense.id)}
        trailingActions={trailingActions(expense.id)}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
          <figure>
            <img
              src={`/img/icono_${categotyInfo.icon}.svg`}
              alt={`${categotyInfo.name} icono`}
              className="w-20"
            />
          </figure>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categotyInfo.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>

          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
