(function registerTeamData(global) {
const { data, models } = global.RemedyRecheck;
const { TeamMember } = models;

data.teamMembers = Object.freeze([
  new TeamMember({ name: "Hussam Badran Albasha", role: "Backend developer/Functional ideas", email: "badran@chalmers.se" }),
  new TeamMember({ name: "Jannah Francine Rosales Beato", role: "The busy", email: "jannahf@chalmers.se" }),
  new TeamMember({ name: "Noel Elmquist", role: "Pollmaster/Organizer", email: "noelel@chalmers.se" }),
  new TeamMember({ name: "Olle Ackebjer", role: "The arms", email: "olleac@chalmers.se" }),
  new TeamMember({ name: "Olle Lilliestam", role: "The brain", email: "ollelil@chalmers.se" }),
  new TeamMember({ name: "Salam Boustaji", role: "Frontend developer/Creative ideas", email: "boustaji@chalmers.se" }),
]);
})(window);
