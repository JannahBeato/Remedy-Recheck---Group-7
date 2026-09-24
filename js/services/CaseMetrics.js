(function registerCaseMetrics(global) {
const { services } = global.RemedyRecheck;

services.CaseMetrics = class CaseMetrics {
  calculate(cases) {
    return {
      active: cases.length,
      fixesRecorded: cases.filter((item) => Boolean(item.actionCompletedDate)).length,
      rechecked: cases.filter((item) => item.hasOutcomeCheck).length,
      needsFollowUp: cases.filter((item) => item.needsFollowUp).length,
    };
  }
};
})(window);
