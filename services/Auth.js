const auth = require('../config/auth');

module.exports = class Auth {

  static #authGuard = auth.authObject.defaults.guard;

  static guard(authGuard) {
    this.#authGuard = authGuard;
    return this;
  }

  static async attempt(req) {
    const guardProvider = auth.authObject.guards[this.#authGuard]?.provider;
    if (guardProvider) {
      const provider = auth.authObject.providers[guardProvider];
      if (provider.driver === 'Sequelize') {
        const model = auth.authObject.providers[guardProvider].model;
        const password = req.body.admin_password;
        delete req.body.admin_password;
        const admin = await model.findOne({ where: req.body });
        if (admin) {
          if (admin.admin_password == password) {
            req.session.isAuthenticated = true;
            req.session.admin = admin;
            return true;
          }
        }
        return false;

      }

      throw new Error(`Undefined Guard => ${this.#authGuard}`);

    }

  }
  static async logout(req) {
    if (req.session.guard in req.session && 'isAuthenticated' in req.session) {
      req.session.admin = undefined;
      req.session.isAuthenticated = undefined;
    }
  }



}