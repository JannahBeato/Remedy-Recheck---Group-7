(function registerSectionNavigation(global) {
const { components, core } = global.RemedyRecheck;
const { Component } = core;

components.SectionNavigation = class SectionNavigation extends Component {
  constructor({ root = document, linkSelector = ".nav-links a", sectionSelector = "main section[id]" } = {}) {
    super(root);
    this.links = this.queryAll(linkSelector).filter((link) => link.getAttribute("href")?.startsWith("#"));
    this.sections = this.queryAll(sectionSelector);
  }

  init() {
    if (!this.links.length || !this.sections.length) return this;

    const observer = new IntersectionObserver((entries) => this.update(entries), {
      rootMargin: "-25% 0px -65% 0px",
    });

    this.sections.forEach((section) => observer.observe(section));
    this.track(() => observer.disconnect());
    return this;
  }

  update(entries) {
    const activeSection = entries.find((entry) => entry.isIntersecting)?.target;
    if (!activeSection) return;
    this.links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${activeSection.id}`);
    });
  }
};
})(window);
