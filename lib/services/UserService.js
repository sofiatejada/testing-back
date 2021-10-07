const User = require('../models/User.js');
const { tokenExchange, getProfile } = require('../utils/spotify.js');

module.exports = class UserService {
  static async create(code) {
    const token = await tokenExchange(code);
    const profile = await getProfile(token);
    const user = await User.findByDisplayName(profile.display_name);

    if(!user) {
      return User.insert({
        displayName: profile.display_name,
        email: profile.email,
      });
    } else {
      return user;
    }
  }
};
