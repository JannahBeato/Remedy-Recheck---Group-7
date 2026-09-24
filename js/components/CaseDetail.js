(function registerCaseDetail(global) {
const { components, core, services } = global.RemedyRecheck;
const { Component } = core;
const { DateFormatter } = services;

components.CaseDetail = class CaseDetail extends Component {
  constructor(store, onOpenRecheck, root = document) {
    super(root);
    this.store = store;
    this.onOpenRecheck = onOpenRecheck;
    this.dates = new DateFormatter();
  }

  init() {
    this.container = this.query("[data-case-detail]");
    if (!this.container) return this;
    this.listen(this.container, "click", (event) => {
      const trigger = event.target.closest("[data-record-recheck]");
      if (trigger && this.currentCase) this.onOpenRecheck(this.currentCase);
    });
    this.track(this.store.subscribe(({ selectedCase }) => this.render(selectedCase)));
    return this;
  }

  render(supplierCase) {
    this.currentCase = supplierCase;
    if (!supplierCase) {
      const empty = document.createElement("p");
      empty.className = "rr-case-empty";
      empty.textContent = "Choose a case to review its follow-up record.";
      this.container.replaceChildren(empty);
      return;
    }

    const header = document.createElement("header");
    header.className = "rr-detail-header";
    const titleGroup = document.createElement("div");
    const overline = document.createElement("p");
    overline.className = "rr-detail-overline";
    overline.textContent = `${supplierCase.id} · ${supplierCase.location}`;
    const title = document.createElement("h2");
    title.textContent = supplierCase.supplier;
    titleGroup.append(overline, title);
    const status = document.createElement("span");
    status.className = `rr-status rr-status-large rr-status-${supplierCase.statusTone}`;
    status.textContent = supplierCase.statusLabel;
    header.append(titleGroup, status);

    const contextGrid = document.createElement("div");
    contextGrid.className = "rr-context-grid";
    contextGrid.append(
      this.field("Issue category", supplierCase.issueCategory),
      this.field("Risk level", supplierCase.riskLevel),
      this.field("Fix completed", this.dates.format(supplierCase.actionCompletedDate)),
      this.field("Next due", this.dates.format(supplierCase.nextDueDate)),
    );

    const issueSection = this.section("Issue and agreed fix", [
      this.textBlock("Issue found", supplierCase.issueSummary),
      this.textBlock("Agreed corrective action", supplierCase.agreedAction),
      this.textBlock("Implementation evidence", supplierCase.implementationEvidence),
    ]);

    const outcomeSection = this.section("Outcome recheck", [
      this.textBlock("Outcome assessment", supplierCase.outcomeSummary),
      this.textBlock("Protected worker signal", supplierCase.workerSignal || "Pending protected feedback."),
    ]);
    const outcomeMeta = document.createElement("div");
    outcomeMeta.className = "rr-detail-meta";
    outcomeMeta.append(
      this.field("Recheck date", this.dates.format(supplierCase.recheckDate)),
      this.field("Reviewer", supplierCase.reviewer || "Not assigned"),
    );
    outcomeSection.append(outcomeMeta);

    const nextSection = this.section("Next decision", [
      this.textBlock("Next action", supplierCase.nextAction),
    ]);
    const nextMeta = document.createElement("div");
    nextMeta.className = "rr-detail-meta";
    nextMeta.append(
      this.field("Owner", supplierCase.nextOwner),
      this.field("Due date", this.dates.format(supplierCase.nextDueDate)),
    );
    nextSection.append(nextMeta);

    const audit = supplierCase.auditTrail.at(-1);
    const auditLine = document.createElement("div");
    auditLine.className = "rr-audit-line";
    const auditIcon = document.createElement("span");
    auditIcon.setAttribute("aria-hidden", "true");
    auditIcon.textContent = "✓";
    const auditCopy = document.createElement("p");
    auditCopy.textContent = audit
      ? `${audit.action} by ${audit.actor} · ${this.dates.formatDateTime(audit.timestamp)}`
      : "No changes have been recorded.";
    auditLine.append(auditIcon, auditCopy);

    const actions = document.createElement("div");
    actions.className = "rr-detail-actions";
    const protection = document.createElement("p");
    protection.textContent = "Worker identities are not displayed in this workspace.";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button button-primary";
    button.dataset.recordRecheck = "";
    button.textContent = supplierCase.hasOutcomeCheck ? "Update outcome recheck" : "Record outcome recheck";
    actions.append(protection, button);

    this.container.replaceChildren(header, contextGrid, issueSection, outcomeSection, nextSection, auditLine, actions);
  }

  field(label, value) {
    const item = document.createElement("div");
    item.className = "rr-field";
    const labelNode = document.createElement("span");
    labelNode.textContent = label;
    const valueNode = document.createElement("strong");
    valueNode.textContent = value || "Not recorded";
    item.append(labelNode, valueNode);
    return item;
  }

  textBlock(label, value) {
    const block = document.createElement("div");
    block.className = "rr-text-block";
    const labelNode = document.createElement("h4");
    labelNode.textContent = label;
    const copy = document.createElement("p");
    copy.textContent = value || "Not recorded";
    block.append(labelNode, copy);
    return block;
  }

  section(title, children) {
    const section = document.createElement("section");
    section.className = "rr-detail-section";
    const heading = document.createElement("h3");
    heading.textContent = title;
    section.append(heading, ...children);
    return section;
  }
};
})(window);
