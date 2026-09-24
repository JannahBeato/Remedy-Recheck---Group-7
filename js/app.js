(function bootstrapRemedyRecheck(global) {
const { components, core, data } = global.RemedyRecheck;
const { Application } = core;
const {
  HeaderScrollState,
  MobileNavigation,
  PrototypeTabs,
  RevealOnScroll,
  SectionNavigation,
  TeamDirectory,
  WorkflowExplorer,
  YearStamp,
} = components;
const { prototypeViews, teamMembers, workflowSteps } = data;

global.RemedyRecheck.Application = class RemedyRecheckApplication extends Application {
  constructor() {
    super([
      new HeaderScrollState(),
      new MobileNavigation(),
      new SectionNavigation(),
      new WorkflowExplorer(workflowSteps),
      new PrototypeTabs(prototypeViews),
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
