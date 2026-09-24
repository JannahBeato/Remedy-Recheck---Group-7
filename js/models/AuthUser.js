(function registerAuthUser(global) {
const { models } = global.RemedyRecheck;

models.AuthUser = class AuthUser {
  constructor({ id, name, email, role, sessionVersion = 1 }) {
    if (!id || !name || !email || !role) {
      throw new Error("An authenticated user requires an id, name, email, and role.");
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.sessionVersion = sessionVersion;
    Object.freeze(this);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      sessionVersion: this.sessionVersion,
    };
  }
};
})(window);
