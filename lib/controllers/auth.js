const { Router } = require('express');
// const UserService = require('../services/UserService.js');
const jwt = require('jsonwebtoken');
const ensureAuth = require('../middleware/ensure-auth.js');
const { tokenExchange, getProfile } = require('../utils/spotify.js');
const User = require('../models/User');

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
      const token = await tokenExchange(req.query.code);
      const profile = await getProfile(token.token);
      const user = await User.findByDisplayName(profile.display_name);
  
      if(!user) {
        return User.insert({
          displayName: profile.display_name,
          email: profile.email,
          profileURL: profile.external_urls.spotify,
          image: profile.images[0].url,
          href: profile.href,
        })}
      
      console.log('======================', user);

      const userJwt = jwt.sign(user.toJSON(), process.env.APP_SECRET, {
        expiresIn: '2h',
      });

      res.cookie('session', userJwt, {
        httpOnly: true,
        maxAge: TWO_HRS_MS,
      });

      res.redirect(`http://localhost:7891/user/dash/${token.token}/${token.refresh}`);
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
