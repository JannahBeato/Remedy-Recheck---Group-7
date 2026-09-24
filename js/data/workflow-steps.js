(function registerWorkflowData(global) {
const { data, models } = global.RemedyRecheck;
const { WorkflowStep } = models;

data.workflowSteps = Object.freeze([
  new WorkflowStep({
    id: "record",
    label: "Step 01 · Record the fix",
    title: "Implementation stays visible, but it is not treated as the final result.",
    description:
      "RR shows the issue category, agreed action, responsible owner, completion date, and supporting evidence for the supplier case.",
  }),
  new WorkflowStep({
    id: "recheck",
    label: "Step 02 · Recheck the result",
    title: "A separate status shows whether the situation improved afterwards.",
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
