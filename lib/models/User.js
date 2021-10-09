const pool = require('../utils/pool.js');

module.exports = class User {
  id;
  displayName;
  email;
  profileURL;
  image;
  href;
  token;

  constructor(row) {
    this.id = row.id;
    this.displayName = row.spotify_username;
    this.email = row.spotify_email;
    this.profileURL = row.spotify_profile;
    this.image = row.spotify_image;
    this.href = row.spotify_href;
    this.token = row.token;
  }

  static async insert({ displayName, email, profileURL, image, href, token }) {
    const { rows } = await pool.query('INSERT INTO users (spotify_username, spotify_email, spotify_profile, spotify_image, spotify_href, token) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [displayName, email, profileURL, image, href, token]);

    return new User(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id=$1', [id]
    )

    if(!rows[0]) return null;
    return new User(rows[0]);
  }

  static async findByDisplayName(displayName) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE spotify_username=$1', [displayName]
    )

    if(!rows[0]) return null;
    return new User(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM users');

    return rows.map((row) => new User(row));
  }

  static async updateById(id, {token}) {
    const existingUser = token ?? existingUser.token;

    const { rows } = await pool.query('UPDATE user SET token=$1 WHERE id=$2 RETURNING *', [token, id]);

    return new User(rows[0]);
  }

  toJSON() {
    return {
      id: this.id,
      displayName: this.displayName,
      email: this.email,
      profileURL: this.profileURL,
      image: this.image,
      href: this.href,
      token: this.token,
    }
    // this means, the this on the new user...self?
    // this(the user).email

    // toJSON in the controller, is jsonifying an INSTANCE of SOME user, new keyword creates an INSTANCE OF A CLASS
    // instance vs static methods javascript
  }

}
