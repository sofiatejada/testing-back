const pool = require('../utils/pool.js');

module.exports = class User {
  displayName;
  email;

  constructor(row) {
    this.displayName = row.spotify_username;
    this.email = row.spotify_email;
  }

  static async insert({ displayName, email }) {
    const { rows } = await pool.query('INSERT INTO users (spotify_username, spotify_email) VALUES ($1, $2) RETURNING *', [displayName, email]);

    return new User(rows[0]);
  }

  static async findByDisplayName(displayName) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE spotify_username=$1', [displayName]
    )

    if(!rows[0]) return null;
    return new User(rows[0]);
  }

  toJSON() {
    return {
      displayName: this.displayName,
      email: this.email,
    }
    // this means, the this on the new user...self?
    // this(the user).email

    // toJSON in the controller, is jsonifying an INSTANCE of SOME user, new keyword creates an INSTANCE OF A CLASS
    // instance vs static methods javascript
  }

}
