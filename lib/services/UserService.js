const User = require('../models/User.js');
const { tokenExchange, getProfile } = require('../utils/spotify.js');

module.exports = class UserService {
  static async create(code) {
    const token = await tokenExchange(code);
    // console.log('THIS IS THE CODE AND TOKEN', code, token);
    const profile = await getProfile(token);
    // console.log('THIS IS THE PROFILE', profile);
    const user = await User.findByDisplayName(profile.display_name);
    // console.log('======================',profile, profile.external_urls.spotify, profile.images[0].url);
    if(!user) {
      return User.insert({
        displayName: profile.display_name,
        email: profile.email,
        profileURL: profile.external_urls.spotify,
        image: profile.images[0].url,
        href: profile.href,
        token: token
      });
    } else {
      return user;
    }
  }
};
