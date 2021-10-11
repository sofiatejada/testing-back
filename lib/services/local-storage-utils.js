const setToken = (refresh_token) => {
  const stringyToken = JSON.stringify(refresh_token);

  localStorage.setItem('REFRESH_TOKEN', stringyToken);
}

const getRefreshToken = () => {
  const stringyRefreshToken = localStorage.getItem('REFRESH_TOKEN');
  const parsedRefreshToken = JSON.parse(stringyRefreshToken);

  if (parsedRefreshToken) {
    return parsedRefreshToken;
  } else {
    return [];
  }
}

module.exports = {
  setToken,
  getRefreshToken,
}

// export function setToken(refresh_token) {
//   const stringyToken = JSON.stringify(refresh_token);

//   localStorage.setItem('REFRESH_TOKEN', stringyToken);
// }

// export function getRefreshToken() {
//   const stringyRefreshToken = localStorage.getItem('REFRESH_TOKEN');
//   const parsedRefreshToken = JSON.parse(stringyRefreshToken);

//   if (parsedRefreshToken) {
//     return parsedRefreshToken;
//   } else {
//     return [];
//   }
// }
