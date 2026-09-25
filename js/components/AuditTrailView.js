(function registerAuditTrailView(global) {
const { components } = global.RemedyRecheck;

components.AuditTrailView = class AuditTrailView {
  constructor(dateFormatter) {
    this.dates = dateFormatter;
  }

  render(entries = []) {
    const section = document.createElement("section");
    section.className = "rr-audit-section";

    const heading = document.createElement("h3");
    heading.textContent = "Audit history";
    section.append(heading);

    if (!entries.length) {
      const empty = document.createElement("p");
      empty.className = "rr-audit-empty";
      empty.textContent = "No changes have been recorded.";
      section.append(empty);
      return section;
    }

    const list = document.createElement("ol");
    list.className = "rr-audit-history";
    [...entries].reverse().forEach((entry) => list.append(this.createEntry(entry)));
    section.append(list);
    return section;
  }

  createEntry(entry) {
    const item = document.createElement("li");
    item.className = "rr-audit-line";

    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "✓";

    const copy = document.createElement("p");
    copy.textContent = `${entry.action} by ${entry.actor} · ${this.dates.formatDateTime(entry.timestamp)}`;
    item.append(icon, copy);
    return item;
  }
};
})(window);
