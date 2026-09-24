(function registerTeamMember(global) {
const { models } = global.RemedyRecheck;

models.TeamMember = class TeamMember {
  constructor({ name, role = "Group 7 member", email = "", image = "" }) {
    if (!name) throw new TypeError("TeamMember requires a name.");
    this.name = name;
    this.role = role;
    this.email = email;
    this.image = image;
    Object.freeze(this);
  }

  get hasContactCard() {
    return Boolean(this.email);
  }

  get hasPhoto() {
    return Boolean(this.image);
  }

  get initials() {
    if (this.name.startsWith("Team member")) return this.name.replace("Team member ", "");
    return this.name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
};
})(window);
