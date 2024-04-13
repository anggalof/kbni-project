export const formatCurrency = (amount: number) => {
  const formattedAmount = amount.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  
  return formattedAmount;
}
