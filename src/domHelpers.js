export const clearChildren = (parentElement) => {
  while (parentElement.lastChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
}

export const downloadFile = (filename, data) => {
  const anchor = document.createElement('a');
  anchor.setAttribute('download', filename);
  anchor.setAttribute('href', data);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
