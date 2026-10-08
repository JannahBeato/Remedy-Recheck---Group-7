(function registerTeamDirectory(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;
const { TeamMemberCardView } = components;

components.TeamDirectory = class TeamDirectory extends Component {
  constructor(members, {
    root = document,
    selector = "[data-team-grid]",
    cardView = new TeamMemberCardView(),
  } = {}) {
    super(root);
    this.members = [...members];
    this.container = this.query(selector);
    this.cardView = cardView;
  }

  init() {
    if (!this.container) return this;
    const fragment = document.createDocumentFragment();
    this.members.forEach((member) => fragment.append(this.cardView.render(member)));
    this.container.replaceChildren(fragment);
    return this;
  }
};
})(window);
