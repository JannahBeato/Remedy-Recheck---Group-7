(function registerRecheckRecord(global) {
const { models } = global.RemedyRecheck;
const VALID_STATUSES = new Set(["improved", "unresolved", "not_safely_verified"]);

models.RecheckRecord = class RecheckRecord {
  constructor(fields) {
    const required = [
      "status",
      "recheckDate",
      "reviewer",
      "evidenceSummary",
      "workerFeedback",
      "nextAction",
      "nextOwner",
      "nextDueDate",
    ];

    required.forEach((field) => {
      if (!String(fields?.[field] || "").trim()) {
        throw new Error(`Please complete the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field.`);
      }
    });

    if (!VALID_STATUSES.has(fields.status)) {
      throw new Error("Choose a valid recheck outcome.");
    }

    Object.assign(this, {
      status: fields.status,
      recheckDate: fields.recheckDate,
      reviewer: fields.reviewer.trim(),
      evidenceSummary: fields.evidenceSummary.trim(),
      workerFeedback: fields.workerFeedback.trim(),
      nextAction: fields.nextAction.trim(),
      nextOwner: fields.nextOwner.trim(),
      nextDueDate: fields.nextDueDate,
      timestamp: new Date().toISOString(),
    });
  }
};
})(window);
