const { Router } = require('express');
const UserService = require('../services/UserService.js');
const jwt = require('jsonwebtoken');
const ensureAuth = require('../middleware/ensure-auth.js');

const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'https://localhost:7891/api/v1/auth/login/callback';
const clientId = '6ce7f238302a45bb8b0132d8e11c4950';

const scopes = [
  'user-top-read',
  'user-read-email',
  'user-read-private',
];

const TWO_HRS_MS = 1000 * 60 * 60 * 2;

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}`
    );
  })
  .get('/login/callback', async (req, res, next) => {
    try{
      const user = await UserService.create(req.query.code);

      const userJwt = jwt.sign(user.toJSON(), process.env.APP_SECRET, {
        expiresIn: '2h',
      });

      res.cookie('session', userJwt, {
        httpOnly: true,
        maxAge: TWO_HRS_MS,
      });

      res.redirect('/');
    } catch (error) {
      next(error);
    }
  })
  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
