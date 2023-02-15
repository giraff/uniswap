function getItem(key: any) {
  const value = localStorage.getItem(key);

  return value;
}

function setItem(key: any, value: any) {
  localStorage.setItem(key, value);
}

export { getItem, setItem };
