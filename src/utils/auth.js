
export function login(userData) {
  localStorage.setItem('user', JSON.stringify(userData));
}


export function logout() {
  localStorage.removeItem('user');
}

export function isLoggedIn() {
  return localStorage.getItem('user') !== null;
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
