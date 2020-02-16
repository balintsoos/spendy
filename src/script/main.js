import {
  getSpendings,
  getSpendingItemText,
  addSpending,
  resetSpendings,
  sumSpendingsUntil,
} from './spendings.js';
import { clearChildren, downloadFile, addListItemTo } from './domHelpers.js';
import { today, weekAgo, monthAgo } from './date.js';

const renderSumValues = () => {
  const dailySum = sumSpendingsUntil(today());
  const weeklySum = sumSpendingsUntil(weekAgo());
  const monthlySum = sumSpendingsUntil(monthAgo());
  document.getElementById('sp-sum-daily-value').textContent = `${dailySum} Ft`;
  document.getElementById('sp-sum-weekly-value').textContent = `${weeklySum} Ft`;
  document.getElementById('sp-sum-monthly-value').textContent = `${monthlySum} Ft`;
}

const renderRecentSpendings = () => {
  const listElement = document.getElementById('recent');
  const addToList = addListItemTo(listElement);
  clearChildren(listElement);
  const spendings = getSpendings();
  if (spendings.length === 0) {
    addToList('No spendings');
  }
  spendings.reverse().map(getSpendingItemText).forEach(addToList);
}

const render = () => {
  renderSumValues();
  renderRecentSpendings();
}

window.addEventListener('load', () => {
  render();
});

document.getElementById('submit').addEventListener('click', () => {
  const category = document.getElementById('category').value;
  const amount = parseInt(document.getElementById('amount').value) || 0;
  const date = new Date().toISOString();
  addSpending({ category, amount, date });
  render();
});

document.getElementById('reset').addEventListener('click', () => {
  resetSpendings();
  render();
});

document.getElementById('download').addEventListener('click', () => {
  const spendings = getSpendings();
  const data = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(spendings))}`;
  const date = new Date().toISOString();
  const filename = `spendings-${date}.json`;
  downloadFile(filename, data);
});
