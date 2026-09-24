(function registerLocalCaseRepository(global) {
const { models, repositories } = global.RemedyRecheck;
const { SupplierCase } = models;

repositories.LocalCaseRepository = class LocalCaseRepository {
  constructor(seedCases, storageKey = "remedy-recheck-cases-v1") {
    this.storageKey = storageKey;
    this.seedCases = seedCases.map((supplierCase) => supplierCase.toJSON());
    this.memoryCases = this.seedCases;
    this.storage = this.resolveStorage();
  }

  resolveStorage() {
    try {
      const probe = "__rr_storage_probe__";
      global.localStorage.setItem(probe, probe);
      global.localStorage.removeItem(probe);
      return global.localStorage;
    } catch (error) {
      return null;
    }
  }

  findAll() {
    const records = this.readRecords();
    return records.map((record) => new SupplierCase(record));
  }

  save(updatedCase) {
    const records = this.readRecords();
    const index = records.findIndex((record) => record.id === updatedCase.id);
    if (index === -1) throw new Error(`Case ${updatedCase.id} was not found.`);
    records[index] = updatedCase.toJSON();
    this.writeRecords(records);
    return new SupplierCase(records[index]);
  }

  readRecords() {
    if (!this.storage) return this.migrateReviewerNames(this.memoryCases).records;

    try {
      const saved = this.storage.getItem(this.storageKey);
      if (!saved) {
        this.writeRecords(this.seedCases);
        return this.seedCases.map((record) => ({ ...record }));
      }
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) throw new Error("Stored case data is invalid.");
      const migration = this.migrateReviewerNames(parsed);
      if (migration.changed) this.writeRecords(migration.records);
      return migration.records;
    } catch (error) {
      return this.seedCases.map((record) => ({ ...record }));
    }
  }

  migrateReviewerNames(records) {
    let changed = false;
    const migratedRecords = records.map((record) => {
      const migrated = {
        ...record,
        auditTrail: (record.auditTrail || []).map((entry) => {
          if (entry.actor !== "Maria Kowalska") return { ...entry };
          changed = true;
          return { ...entry, actor: "Maria" };
        }),
      };

      if (migrated.reviewer === "Maria Kowalska") {
        migrated.reviewer = "Maria";
        changed = true;
      }
      return migrated;
    });

    return { records: migratedRecords, changed };
  }

  writeRecords(records) {
    const snapshot = records.map((record) => ({ ...record }));
    this.memoryCases = snapshot;
    if (!this.storage) return;

    try {
      this.storage.setItem(this.storageKey, JSON.stringify(snapshot));
    } catch (error) {
      this.storage = null;
    }
  }
};
})(window);
