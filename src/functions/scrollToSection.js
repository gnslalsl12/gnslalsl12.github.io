const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  console.log(section);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export default scrollToSection;
