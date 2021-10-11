const { Router } = require('express');
const UserService = require('../services/UserService.js');
const jwt = require('jsonwebtoken');
const ensureAuth = require('../middleware/ensure-auth.js');
const RefreshService = require('../services/RefreshService.js');
const { tokenRefresh } = require('../utils/spotify.js');

const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:7890/api/v1/auth/login/callback';

const scopes = [
  'user-top-read',
  'user-read-email',
  'user-read-private',
];

const TWO_HRS_MS = 1000 * 60 * 60 * 2;

module.exports = Router()
.get('/login', (req, res) => {
  res.redirect(
    `${authEndpoint}?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}`
    );
  })
  .get('/login/callback', async (req, res, next) => {
    try{
      const user = await UserService.create(req.query.code);
      
      // const 
      // console.log('======================', user);

      const userJwt = jwt.sign(user.toJSON(), process.env.APP_SECRET, {
        expiresIn: '2h',
      });

      res.cookie('session', userJwt, {
        httpOnly: true,
        maxAge: TWO_HRS_MS,
      });
      // console.log('THE USER ON AUTH.JS', user);

      res.redirect('http://localhost:7891/user/dash');
    } catch (error) {
      next(error);
    }
  })
  .get('/refresh_token', (req, res) => {
    const refresh_token = req.query.refresh_token;

    const newToken = tokenRefresh(refresh_token);

    if(!error && response.statusCode === 200) {
      res.send({
        newToken
      });
    }
  })
  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
