(function bootstrapRemedyRecheck(global) {
const { components, core, data } = global.RemedyRecheck;
const { Application } = core;
const {
  HeaderScrollState,
  MobileNavigation,
  PublicMetrics,
  RevealOnScroll,
  SectionNavigation,
  TeamDirectory,
  WorkflowExplorer,
  YearStamp,
} = components;
const { teamMembers, workflowSteps } = data;
const { PublicCaseSummaryRepository } = global.RemedyRecheck.repositories;
const { CaseMetrics } = global.RemedyRecheck.services;

global.RemedyRecheck.Application = class RemedyRecheckApplication extends Application {
  constructor() {
    super([
      new HeaderScrollState(),
      new MobileNavigation(),
      new SectionNavigation(),
      new WorkflowExplorer(workflowSteps),
      new PublicMetrics(new PublicCaseSummaryRepository(), new CaseMetrics()),
      new TeamDirectory(teamMembers),
      new YearStamp(),
      // Starts last so it also observes team cards created by TeamDirectory.
      new RevealOnScroll(),
    ]);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  new global.RemedyRecheck.Application().start();
});
})(window);
