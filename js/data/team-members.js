(function registerTeamData(global) {
const { data, models } = global.RemedyRecheck;
const { TeamMember } = models;

data.teamMembers = Object.freeze([
  new TeamMember({ name: "Hussam Badran Albasha", role: "Application Logic Developer & Technical Lead", email: "badran@chalmers.se", image: "images/team/Hussam.png" }),
  new TeamMember({ name: "Jannah Francine Rosales Beato", role: "Sustainability & Documentation Lead", email: "jannahf@chalmers.se", image: "images/team/Jannah.png" }),
  new TeamMember({ name: "Noel Elmquist", role: "Project Coordinator & User Research Lead", email: "noelel@chalmers.se", image: "images/team/Noel.png" }),
  new TeamMember({ name: "Olle Ackebjer", role: "Prototype Testing & Quality Lead", email: "olleac@chalmers.se", image: "images/team/Olle1.png", imageZoom: 0.8 }),
  new TeamMember({ name: "Olle Lilliestam", role: "Concept & Analysis Lead", email: "ollelil@chalmers.se", image: "images/team/" }),
  new TeamMember({ name: "Salam Boustaji", role: "Frontend & Visual Design Lead", email: "boustaji@chalmers.se", image: "images/team/Salam.jpg" }),
]);
})(window);
