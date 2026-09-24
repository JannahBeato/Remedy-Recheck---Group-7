(function registerPublicCaseSummaryRepository(global) {
const { repositories } = global.RemedyRecheck;

repositories.PublicCaseSummaryRepository = class PublicCaseSummaryRepository {
  constructor(storageKey = "remedy-recheck-cases-v1") {
    this.storageKey = storageKey;
    this.storage = this.resolveStorage();
  }

  resolveStorage() {
    try {
      global.localStorage.getItem(this.storageKey);
      return global.localStorage;
    } catch (error) {
      return null;
    }
  }

  findAll() {
    if (!this.storage) return null;

    try {
      const saved = this.storage.getItem(this.storageKey);
      if (!saved) return null;
      const records = JSON.parse(saved);
      return Array.isArray(records) ? records : null;
    } catch (error) {
      return null;
    }
  }
};
})(window);
