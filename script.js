const getSpendings = () => {
  const spendings = window.localStorage.getItem('spendings');
  return spendings ? JSON.parse(spendings) : [];
}

const saveSpendings = spendings => {
  window.localStorage.setItem('spendings', JSON.stringify(spendings));
}

const resetSpendings = () => {
  window.localStorage.clear();
}

const addSpending = spending => {
  const spendings = getSpendings();
  spendings.push(spending);
  saveSpendings(spendings);
}

const clearChildren = (parentElement) => {
  while (parentElement.lastChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
}

const getSpendingItemText = spending => {
  return `${spending.amount} Ft - ${spending.category}`;
}

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
