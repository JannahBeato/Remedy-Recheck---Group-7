(function registerWorkflowData(global) {
const { data, models } = global.RemedyRecheck;
const { WorkflowStep } = models;

data.workflowSteps = Object.freeze([
  new WorkflowStep({
    id: "record",
    label: "Step 01 · Record the Remedy",
    title: "Document the suggested solution.",
    description:
      "RR keeps the issue, agreed solution, responsible party, and supporting evidence in one place. Creating a clear record before checking whether the solution has worked.",
  }),
  new WorkflowStep({
    id: "recheck",
    label: "Step 02 · Recheck the result",
    title: "Once a solution is in place, RR helps check whether the issue has actually improved ",
    description:
      "An authorized reviewer records the outcome as improved, unresolved, or not yet safely verified and links the result to supporting evidence.",
  }),
  new WorkflowStep({
    id: "act",
    label: "Step 03 · Show the next action",
    title: "Unresolved or unverified issues remain visible to the right owner.",
    description:
      "RR shows who needs to follow up and by when, while leaving serious decisions with qualified people and established channels.",
  }),
]);
})(window);
