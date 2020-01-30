const getSpendings = () => {
  const spendings = window.localStorage.getItem('spendings');
  return spendings ? JSON.parse(spendings) : [];
}

const saveSpendings = spendings => {
  window.localStorage.setItem('spendings', JSON.stringify(spendings));
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

const renderRecentSpendings = () => {
  const parentElement = document.getElementById('recent')
  clearChildren(parentElement);
  const spendings = getSpendings();
  if (spendings.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.textContent = 'No spendings';
    parentElement.appendChild(emptyMessage);
  }
  spendings.forEach(spending => {
    const element = document.createElement('div');
    element.textContent = spending.amount;
    parentElement.appendChild(element);
  });
}

window.addEventListener('load', () => {
  renderRecentSpendings();
});

document.getElementById('submit').addEventListener('click', () => {
  addSpending({ amount: 69 });
  renderRecentSpendings();
});

document.getElementById('reset').addEventListener('click', () => {
  window.localStorage.clear();
  renderRecentSpendings();
});
