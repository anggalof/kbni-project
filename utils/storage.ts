export function clearStorages() {
  localStorage.removeItem('isLoggedIn');
}

export function setLoggedIn(value: string) {
  localStorage.setItem('isLoggedIn', value)
}
