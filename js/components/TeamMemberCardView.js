(function registerTeamMemberCardView(global) {
const { components } = global.RemedyRecheck;

components.TeamMemberCardView = class TeamMemberCardView {
  render(member) {
    const card = document.createElement(member.email ? "a" : "article");
    card.className = `team-card reveal${member.hasContactCard ? "" : " is-placeholder"}`;

    if (member.email) {
      card.href = `mailto:${member.email}`;
      card.setAttribute("aria-label", `Email ${member.name} at ${member.email}`);
    }

    card.append(
      this.createPhoto(member),
      this.createTextElement("h3", "", member.name),
      this.createTextElement("span", "team-role", member.role),
      this.createTextElement("small", "team-email", member.email || "Photo and email to be added"),
    );

    return card;
  }

  createPhoto(member) {
    if (!member.image) return this.createPhotoFallback(member);

    const image = document.createElement("img");
    image.className = "team-photo";
    image.src = member.image;
    image.alt = `Portrait of ${member.name}`;
    image.addEventListener("error", () => image.replaceWith(this.createPhotoFallback(member)), { once: true });
    return image;
  }

  createPhotoFallback(member) {
    const fallback = this.createTextElement("div", "team-photo", member.initials);
    fallback.setAttribute("aria-hidden", "true");
    return fallback;
  }

  createTextElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }
};
})(window);
