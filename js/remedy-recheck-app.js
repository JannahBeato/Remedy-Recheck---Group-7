(function bootstrapWorkspace(global) {
const { components, core, data, repositories, services, state } = global.RemedyRecheck;
const { Application } = core;

global.RemedyRecheck.WorkspaceApplication = class WorkspaceApplication extends Application {
  constructor() {
    const repository = new repositories.LocalCaseRepository(data.supplierCases);
    const store = new state.CaseStore(repository);
    const dialog = new components.RecheckDialog((caseId, record) => store.recordRecheck(caseId, record));

    super([
      new components.AppMetrics(store, new services.CaseMetrics()),
      new components.CaseFilters(store),
      new components.CaseList(store),
      new components.CaseDetail(store, (supplierCase) => dialog.open(supplierCase)),
      dialog,
      new components.ProtectionDialog(),
      new components.Toast(),
    ]);

    this.store = store;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const sessionRepository = new repositories.SessionRepository();
  const authService = new services.AuthenticationService(sessionRepository);
  const authenticationShell = new components.AuthenticationShell(
    authService,
    () => new global.RemedyRecheck.WorkspaceApplication(),
  );
  new Application([authenticationShell]).start();
});
})(window);
