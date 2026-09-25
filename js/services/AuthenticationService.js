(function registerAuthenticationService(global) {
const { models, services } = global.RemedyRecheck;
const { AuthUser } = models;

const ACCOUNT = Object.freeze({
  email: "maria@ikea.com",
  password: "RemedyRecheck2026",
  user: Object.freeze({
    id: "maria",
    name: "Maria",
    email: "maria@ikea.com",
    role: "Sustainability reviewer",
    sessionVersion: 1,
  }),
});

services.AuthenticationService = class AuthenticationService {
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  signIn(email, password) {
    if (!this.credentialsMatch(email, password)) return null;

    const user = new AuthUser(ACCOUNT.user);
    this.sessionRepository.save(user);
    return user;
  }

  currentUser() {
    const session = this.sessionRepository.get();
    if (!this.isCurrentSession(session)) {
      this.sessionRepository.clear();
      return null;
    }

    try {
      return new AuthUser(session);
    } catch (error) {
      this.sessionRepository.clear();
      return null;
    }
  }

  signOut() {
    this.sessionRepository.clear();
  }

  credentialsMatch(email, password) {
    return String(email || "").trim().toLowerCase() === ACCOUNT.email
      && String(password || "") === ACCOUNT.password;
  }

  isCurrentSession(session) {
    return Boolean(
      session
      && session.id === ACCOUNT.user.id
      && session.email === ACCOUNT.user.email
      && session.sessionVersion === ACCOUNT.user.sessionVersion,
    );
  }
};
})(window);
