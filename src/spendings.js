export const getSpendings = () => {
  const spendings = window.localStorage.getItem('spendings');
  return spendings ? JSON.parse(spendings) : [];
}

export const saveSpendings = spendings => {
  window.localStorage.setItem('spendings', JSON.stringify(spendings));
}

export const resetSpendings = () => {
  window.localStorage.clear();
}

export const addSpending = spending => {
  const spendings = getSpendings();
  spendings.push(spending);
  saveSpendings(spendings);
}

export const getSpendingItemText = spending => {
  const date = new Date(spending.date).toLocaleString('hu');
  return `${spending.amount} Ft - ${spending.category} - ${date}`;
}

export const sumSpendingsUntil = date => {
  const spendings = getSpendings().reverse();
  let sum = 0;
  let index = 0;
  while (spendings[index] && date < new Date(spendings[index].date)) {
    sum += spendings[index].amount;
    index += 1;
  }
  return sum;
};

export const migrateSpendings = () => {
  saveSpendings(getSpendings().map(spending => ({ ...spending, amount: parseInt(spending.amount) })));
}
