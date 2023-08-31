export const BASE_URL = "https://api.diplom.dobrynya.nomoreparties.co";

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const register = ({ password, email, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password
    })

  })
    .then(getResponseData);
};

export const login = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    }),
  })
    .then(getResponseData);
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(getResponseData);
};

export const deleteCookie = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(getResponseData);
};

export const setUser = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "name": name,
      "email": email
    })
  })
    .then(getResponseData);
};

export const getMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(getResponseData);
};

export const addMovie = (movieData) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData)
  })
    .then(getResponseData);
};

export const deleteMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(getResponseData);
};

