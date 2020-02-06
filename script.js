import { getSpendings, getSpendingItemText, addSpending, resetSpendings } from './src/spendings.js';
import { clearChildren, downloadFile, addListItemTo } from './src/domHelpers.js';

const renderRecentSpendings = () => {
  const listElement = document.getElementById('recent');
  const addToList = addListItemTo(listElement);
  clearChildren(listElement);
  const spendings = getSpendings();
  if (spendings.length === 0) {
    addToList('No spendings');
  }
  spendings.map(getSpendingItemText).forEach(addToList);
}

window.addEventListener('load', () => {
  renderRecentSpendings();
});

document.getElementById('submit').addEventListener('click', () => {
  const category = document.getElementById('category').value;
  const amount = document.getElementById('amount').value;
  const date = new Date().toISOString();
  addSpending({ category, amount, date });
  renderRecentSpendings();
});

document.getElementById('reset').addEventListener('click', () => {
  resetSpendings();
  renderRecentSpendings();
});

document.getElementById('download').addEventListener('click', () => {
  const spendings = getSpendings();
  const data = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(spendings))}`;
  const date = new Date().toISOString();
  const filename = `spendings-${date}.json`;
  downloadFile(filename, data);
});
