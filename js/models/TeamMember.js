(function registerTeamMember(global) {
const { models } = global.RemedyRecheck;

models.TeamMember = class TeamMember {
  constructor({ name, role, email, image = "", imageZoom = 1 }) {
    if (!name || !role || !email) {
      throw new TypeError("TeamMember requires a name, role, and email.");
    }
    this.name = name;
    this.role = role;
    this.email = email;
    this.image = image;
    this.imageZoom = imageZoom;
    Object.freeze(this);
  }

  get hasPhoto() {
    return Boolean(this.image);
  }

  get initials() {
    return this.name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
};
})(window);
