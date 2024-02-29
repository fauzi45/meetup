export function formatDate(inputDateStr) {
  const inputDate = new Date(inputDateStr);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return inputDate.toLocaleDateString('en-GB', options);
}
