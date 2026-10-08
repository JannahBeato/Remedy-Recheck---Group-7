(function registerRecheckDialog(global) {
const { components, core, models } = global.RemedyRecheck;
const { Component } = core;
const { RecheckRecord } = models;

components.RecheckDialog = class RecheckDialog extends Component {
  constructor(onSave, root = document) {
    super(root);
    this.onSave = onSave;
  }

  init() {
    this.dialog = this.query("[data-recheck-dialog]");
    this.form = this.query("[data-recheck-form]");
    this.error = this.query("[data-form-error]");
    if (!this.dialog || !this.form) return this;

    this.listen(this.form, "submit", (event) => this.submit(event));
    this.queryAll("[data-dialog-cancel]").forEach((button) => {
      this.listen(button, "click", () => this.close());
    });
    this.listen(this.dialog, "click", (event) => {
      if (event.target === this.dialog) this.close();
    });
    return this;
  }

  open(supplierCase) {
    this.caseId = supplierCase.id;
    this.form.reset();
    this.error.textContent = "";
    this.form.elements.caseId.value = supplierCase.id;
    this.form.elements.status.value = supplierCase.hasOutcomeCheck ? supplierCase.outcomeStatus : "";
    this.form.elements.recheckDate.value = supplierCase.recheckDate || new Date().toISOString().slice(0, 10);
    this.form.elements.reviewer.value = supplierCase.reviewer || "Maria";
    this.form.elements.evidenceSummary.value = supplierCase.hasOutcomeCheck ? supplierCase.outcomeSummary : "";
    this.form.elements.workerFeedback.value = supplierCase.workerSignal || "";
    this.form.elements.nextAction.value = supplierCase.nextAction || "";
    this.form.elements.nextOwner.value = supplierCase.nextOwner || "";
    this.form.elements.nextDueDate.value = supplierCase.nextDueDate || "";
    this.query("[data-dialog-case]").textContent = `${supplierCase.id} · ${supplierCase.supplier}`;

    if (typeof this.dialog.showModal === "function") this.dialog.showModal();
    else this.dialog.setAttribute("open", "");
  }

  submit(event) {
    event.preventDefault();
    this.error.textContent = "";
    try {
      const values = Object.fromEntries(new FormData(this.form));
      const savedCase = this.onSave(values.caseId, new RecheckRecord(values));
      this.close();
      this.form.dispatchEvent(new CustomEvent("recheck:saved", { bubbles: true, detail: savedCase }));
    } catch (error) {
      this.error.textContent = error.message;
    }
  }

  close() {
    if (!this.dialog?.hasAttribute("open")) return;
    if (typeof this.dialog.close === "function") this.dialog.close();
    else this.dialog.removeAttribute("open");
  }

  destroy() {
    this.close();
    super.destroy();
  }
};
})(window);
