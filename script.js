import { getSpendings, getSpendingItemText, addSpending, resetSpendings } from './src/spendings.js';
import { clearChildren, downloadFile } from './src/domHelpers.js';

const renderRecentSpendings = () => {
  const parentElement = document.getElementById('recent');
  clearChildren(parentElement);
  const spendings = getSpendings();
  if (spendings.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.textContent = 'No spendings';
    parentElement.appendChild(emptyMessage);
  }
  spendings.forEach(spending => {
    const element = document.createElement('div');
    element.textContent = getSpendingItemText(spending);
    parentElement.appendChild(element);
  });
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
