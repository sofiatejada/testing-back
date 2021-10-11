const User = require('../models/User.js');
const { tokenExchange, getProfile } = require('../utils/spotify.js');
// const { getRefreshToken, setToken } = require('./local-storage-utils.js');

module.exports = class UserService {
  static async create(code) {
    const token = await tokenExchange(code);
    const profile = await getProfile(token.token);
    const user = await User.findByDisplayName(profile.display_name);

    if(!user) {
      return User.insert({
        displayName: profile.display_name,
        email: profile.email,
        profileURL: profile.external_urls.spotify,
        image: profile.images[0].url,
        href: profile.href,
      }), token.refresh, token.token;

    } else {
      return user;
    }
  }
};
