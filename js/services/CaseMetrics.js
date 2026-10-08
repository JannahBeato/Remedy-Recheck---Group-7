(function registerCaseMetrics(global) {
const { services } = global.RemedyRecheck;

services.CaseMetrics = class CaseMetrics {
  calculate(cases = []) {
    return {
      active: cases.length,
      fixesRecorded: cases.filter((item) => Boolean(item.actionCompletedDate)).length,
      rechecked: cases.filter((item) => this.hasOutcomeCheck(item)).length,
      needsFollowUp: cases.filter((item) => this.needsFollowUp(item)).length,
    };
  }

  hasOutcomeCheck(item) {
    if (typeof item?.hasOutcomeCheck === "boolean") return item.hasOutcomeCheck;
    return ["improved", "unresolved", "not_safely_verified"].includes(item?.outcomeStatus);
  }

  needsFollowUp(item) {
    if (typeof item?.needsFollowUp === "boolean") return item.needsFollowUp;
    return ["unresolved", "not_safely_verified"].includes(item?.outcomeStatus);
  }
};
})(window);
