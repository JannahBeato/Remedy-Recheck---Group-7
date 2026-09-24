(function registerSupplierCase(global) {
const { models } = global.RemedyRecheck;

const OUTCOME_STATUSES = new Set([
  "improved",
  "unresolved",
  "not_safely_verified",
  "recheck_due",
  "action_recorded",
]);

const STATUS_LABELS = {
  improved: "Improved",
  unresolved: "Unresolved",
  not_safely_verified: "Not safely verified",
  recheck_due: "Recheck due",
  action_recorded: "Action recorded",
};

models.SupplierCase = class SupplierCase {
  constructor(details) {
    if (!details?.id || !details?.supplier || !details?.issueCategory) {
      throw new Error("A supplier case requires an id, supplier, and issue category.");
    }

    if (!OUTCOME_STATUSES.has(details.outcomeStatus)) {
      throw new Error(`Unsupported outcome status: ${details.outcomeStatus}`);
    }

    Object.assign(this, {
      id: details.id,
      supplier: details.supplier,
      location: details.location,
      issueCategory: details.issueCategory,
      riskLevel: details.riskLevel || "Medium",
      issueSummary: details.issueSummary,
      agreedAction: details.agreedAction,
      actionOwner: details.actionOwner,
      actionCompletedDate: details.actionCompletedDate,
      implementationEvidence: details.implementationEvidence,
      outcomeStatus: details.outcomeStatus,
      outcomeSummary: details.outcomeSummary || "Outcome check has not been completed.",
      recheckDate: details.recheckDate || "",
      reviewer: details.reviewer || "",
      workerSignal: details.workerSignal || "",
      nextAction: details.nextAction || "",
      nextOwner: details.nextOwner || "",
      nextDueDate: details.nextDueDate || "",
      lastUpdated: details.lastUpdated,
      auditTrail: [...(details.auditTrail || [])],
    });
  }

  get statusLabel() {
    return STATUS_LABELS[this.outcomeStatus];
  }

  get statusTone() {
    if (this.outcomeStatus === "improved") return "improved";
    if (this.outcomeStatus === "unresolved") return "unresolved";
    if (this.outcomeStatus === "not_safely_verified") return "unverified";
    return "awaiting";
  }

  get hasOutcomeCheck() {
    return ["improved", "unresolved", "not_safely_verified"].includes(this.outcomeStatus);
  }

  get needsFollowUp() {
    return ["unresolved", "not_safely_verified"].includes(this.outcomeStatus);
  }

  get searchText() {
    return [this.id, this.supplier, this.location, this.issueCategory, this.issueSummary]
      .join(" ")
      .toLowerCase();
  }

  withRecheck(record) {
    const timestamp = record.timestamp || new Date().toISOString();
    return new models.SupplierCase({
      ...this.toJSON(),
      outcomeStatus: record.status,
      outcomeSummary: record.evidenceSummary,
      recheckDate: record.recheckDate,
      reviewer: record.reviewer,
      workerSignal: record.workerFeedback,
      nextAction: record.nextAction,
      nextOwner: record.nextOwner,
      nextDueDate: record.nextDueDate,
      lastUpdated: timestamp,
      auditTrail: [
        ...this.auditTrail,
        {
          timestamp,
          actor: record.reviewer,
          action: `Outcome recorded as ${STATUS_LABELS[record.status]}`,
        },
      ],
    });
  }

  toJSON() {
    return {
      id: this.id,
      supplier: this.supplier,
      location: this.location,
      issueCategory: this.issueCategory,
      riskLevel: this.riskLevel,
      issueSummary: this.issueSummary,
      agreedAction: this.agreedAction,
      actionOwner: this.actionOwner,
      actionCompletedDate: this.actionCompletedDate,
      implementationEvidence: this.implementationEvidence,
      outcomeStatus: this.outcomeStatus,
      outcomeSummary: this.outcomeSummary,
      recheckDate: this.recheckDate,
      reviewer: this.reviewer,
      workerSignal: this.workerSignal,
      nextAction: this.nextAction,
      nextOwner: this.nextOwner,
      nextDueDate: this.nextDueDate,
      lastUpdated: this.lastUpdated,
      auditTrail: [...this.auditTrail],
    };
  }
};
})(window);
