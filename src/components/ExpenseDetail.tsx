import { useMemo } from "react";

import AmountDisplay from "./AmountDisplay";

import type { Expense } from "../types";
import { formatDate } from "../helpers";
import { categories } from "../data/categories";

type ExpenseDetailProps = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const categotyInfo = useMemo(
    () => categories.filter(({ id }) => id === expense.category)[0],
    [expense]
  );

  return (
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
  );
}
