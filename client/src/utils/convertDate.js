export function formatDate(inputDateStr) {
  const inputDate = new Date(inputDateStr);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return inputDate.toLocaleDateString('en-GB', options);
}

export function formatMonthYear(inputDateStr) {
  const inputDate = new Date(inputDateStr);
  const options = { month: 'long', year: 'numeric' };
  return inputDate.toLocaleDateString('en-GB', options);
}
