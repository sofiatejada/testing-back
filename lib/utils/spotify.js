const fetch = require('node-fetch');
const encodeBody = require('./encodeBody.js');

const tokenExchange = async (code) => {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: encodeBody({
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:7891/api/v1/auth/login/callback',
      client_id: '6ce7f238302a45bb8b0132d8e11c4950',
      client_secret: '56103612393947f5a0deba24f1135a45',
      code
    })
  });

  const body = await res.json();
  return body.access_token;
};

const getProfile = async (token) => {
  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await res.json();
  return body;
};

module.exports = {
  tokenExchange,
  getProfile
};
