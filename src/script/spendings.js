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

export const sum = list => list.reduce((prev, curr) => prev + curr, 0);

export const getSpendingsUntil = date => {
  return getSpendings().filter(spending => date < new Date(spending.date));
}

export const sumSpendingsUntil = date => {
  const amounts = getSpendingsUntil(date).map(spending => spending.amount);
  return sum(amounts);
};

export const sumSpendingsByCategoryUntil = date => {
  const spendings = getSpendingsUntil(date);
  const sumByCategory = {};
  spendings.forEach(spending => {
    if (!sumByCategory[spending.category]) {
      sumByCategory[spending.category] = 0;
    }
    sumByCategory[spending.category] += spending.amount;
  });
  return Object.entries(sumByCategory);
}

export const getSpendingByCategoryItemText = sumByCategory => {
  return `${sumByCategory[0]} - ${sumByCategory[1]} Ft`;
}
