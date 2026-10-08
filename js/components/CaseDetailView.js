(function registerCaseDetailView(global) {
const { components, services } = global.RemedyRecheck;
const { AuditTrailView } = components;
const { DateFormatter } = services;

components.CaseDetailView = class CaseDetailView {
  constructor(dateFormatter = new DateFormatter()) {
    this.dates = dateFormatter;
    this.auditTrailView = new AuditTrailView(dateFormatter);
  }

  render(container, supplierCase) {
    if (!supplierCase) {
      container.replaceChildren(this.createEmptyState());
      return;
    }

    container.replaceChildren(
      this.createHeader(supplierCase),
      this.createContext(supplierCase),
      this.createIssueSection(supplierCase),
      this.createOutcomeSection(supplierCase),
      this.createNextDecisionSection(supplierCase),
      this.auditTrailView.render(supplierCase.auditTrail),
      this.createActions(supplierCase),
    );
  }

  createEmptyState() {
    const empty = document.createElement("p");
    empty.className = "rr-case-empty";
    empty.textContent = "Choose a case to review its follow-up record.";
    return empty;
  }

  createHeader(supplierCase) {
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
    return header;
  }

  createContext(supplierCase) {
    const context = document.createElement("div");
    context.className = "rr-context-grid";
    context.append(
      this.createField("Issue category", supplierCase.issueCategory),
      this.createField("Risk level", supplierCase.riskLevel),
      this.createField("Fix completed", this.dates.format(supplierCase.actionCompletedDate)),
      this.createField("Action owner", supplierCase.actionOwner),
    );
    return context;
  }

  createIssueSection(supplierCase) {
    return this.createSection("Issue and agreed fix", [
      this.createTextBlock("Issue found", supplierCase.issueSummary),
      this.createTextBlock("Agreed corrective action", supplierCase.agreedAction),
      this.createTextBlock("Implementation evidence", supplierCase.implementationEvidence),
    ]);
  }

  createOutcomeSection(supplierCase) {
    const section = this.createSection("Outcome recheck", [
      this.createTextBlock("Outcome assessment", supplierCase.outcomeSummary),
      this.createTextBlock("Protected worker signal", supplierCase.workerSignal || "Pending protected feedback."),
    ]);
    section.append(this.createMeta([
      ["Recheck date", this.dates.format(supplierCase.recheckDate)],
      ["Reviewer", supplierCase.reviewer || "Not assigned"],
    ]));
    return section;
  }

  createNextDecisionSection(supplierCase) {
    const section = this.createSection("Next decision", [
      this.createTextBlock("Next action", supplierCase.nextAction),
    ]);
    section.append(this.createMeta([
      ["Owner", supplierCase.nextOwner],
      ["Due date", this.dates.format(supplierCase.nextDueDate)],
    ]));
    return section;
  }

  createMeta(fields) {
    const meta = document.createElement("div");
    meta.className = "rr-detail-meta";
    meta.append(...fields.map(([label, value]) => this.createField(label, value)));
    return meta;
  }

  createActions(supplierCase) {
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
    return actions;
  }

  createField(label, value) {
    const item = document.createElement("div");
    item.className = "rr-field";
    const labelNode = document.createElement("span");
    labelNode.textContent = label;
    const valueNode = document.createElement("strong");
    valueNode.textContent = value || "Not recorded";
    item.append(labelNode, valueNode);
    return item;
  }

  createTextBlock(label, value) {
    const block = document.createElement("div");
    block.className = "rr-text-block";
    const labelNode = document.createElement("h4");
    labelNode.textContent = label;
    const copy = document.createElement("p");
    copy.textContent = value || "Not recorded";
    block.append(labelNode, copy);
    return block;
  }

  createSection(title, children) {
    const section = document.createElement("section");
    section.className = "rr-detail-section";
    const heading = document.createElement("h3");
    heading.textContent = title;
    section.append(heading, ...children);
    return section;
  }
};
})(window);
