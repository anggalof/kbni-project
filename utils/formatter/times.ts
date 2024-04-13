export const expiredDate = (totalDays: number) => {
  const expiredDay = totalDays % 365;
  
  return expiredDay;
}