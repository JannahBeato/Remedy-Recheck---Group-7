(function registerTeamMemberCardView(global) {
const { components } = global.RemedyRecheck;

components.TeamMemberCardView = class TeamMemberCardView {
  render(member) {
    const card = document.createElement("a");
    card.className = `team-card reveal${member.hasPhoto ? "" : " has-photo-fallback"}`;
    card.href = `mailto:${member.email}`;
    card.setAttribute("aria-label", `Email ${member.name} at ${member.email}`);

    card.append(
      this.createPhoto(member),
      this.createTextElement("h3", "", member.name),
      this.createTextElement("span", "team-role", member.role),
      this.createTextElement("small", "team-email", member.email),
    );

    return card;
  }

  createPhoto(member) {
    if (!member.image) return this.createPhotoFallback(member);

    const image = document.createElement("img");
    image.className = "team-photo";
    image.src = member.image;
    image.alt = `Portrait of ${member.name}`;

    // A zoom below 1 shrinks the photo inside its circle, for photos cropped too tightly.
    let photo = image;
    if (member.imageZoom !== 1) {
      photo = document.createElement("div");
      photo.className = "team-photo team-photo-zoomed";
      image.className = "";
      image.style.transform = `scale(${member.imageZoom})`;
      photo.append(image);
    }

    image.addEventListener("error", () => photo.replaceWith(this.createPhotoFallback(member)), { once: true });
    return photo;
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
