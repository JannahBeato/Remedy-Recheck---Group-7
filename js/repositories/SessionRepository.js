(function registerSessionRepository(global) {
const { repositories } = global.RemedyRecheck;

repositories.SessionRepository = class SessionRepository {
  constructor(storageKey = "remedy-recheck-session-v1") {
    this.storageKey = storageKey;
    this.memorySession = null;
    this.storage = this.resolveStorage();
  }

  resolveStorage() {
    try {
      const probe = "__rr_session_probe__";
      global.sessionStorage.setItem(probe, probe);
      global.sessionStorage.removeItem(probe);
      return global.sessionStorage;
    } catch (error) {
      return null;
    }
  }

  get() {
    if (!this.storage) return this.memorySession ? { ...this.memorySession } : null;

    try {
      const saved = this.storage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      this.clear();
      return null;
    }
  }

  save(user) {
    const session = user.toJSON();
    this.memorySession = session;
    if (!this.storage) return session;

    try {
      this.storage.setItem(this.storageKey, JSON.stringify(session));
    } catch (error) {
      this.storage = null;
    }
    return session;
  }

  clear() {
    this.memorySession = null;
    if (!this.storage) return;

    try {
      this.storage.removeItem(this.storageKey);
    } catch (error) {
      this.storage = null;
    }
  }
};
})(window);
