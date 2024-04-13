export interface TExpenses {
  id: number,
  label: string,
  totalExpensesPerMonth: TExpensesPerMonth[]
}

export interface TExpensesPerMonth {
  id: number,
  expenses: number,
  dateTime: string,
}
