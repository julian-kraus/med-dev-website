export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  active: boolean;
};

export const teamMembers: TeamMember[] = [
  {
    id: "viviana-sutedjo",
    name: "Viviana Sutedjo",
    role: "Medicine and Software Engineering",
    bio: "Viviana is a Software Engineer at Google, medical student at LMU, founder of DSC Munich and a community enthusiast with a passion to connect the two fields.",
    image: "/assets/images/image01.webp",
    linkedin: "https://www.linkedin.com/in/viviana-sutedjo/",
    active: true,
  },
  {
    id: "anja-oberender",
    name: "Anja Oberender",
    role: "Medicine",
    bio: "Anja is a medical journalist at Springer Nature, studied Molecular Biology at LMU, is enthusiastic for science communication and med tech and aims to bring people from both areas together.",
    image: "/assets/images/image06.webp",
    linkedin: "https://www.linkedin.com/in/anja-oberender-4b0356218/",
    active: true,
  },
  {
    id: "leonard-rinser",
    name: "Leonard Rinser",
    role: "Healthcare Entrepreneurship",
    bio: "Leonard is a healthcare entrepreneur himself for some years, has built the Fraunhofer deep tech accelerator AHEAD, co-founded GLAICE health and is the global healthcare executive at Sigma Squared Society.",
    image: "/assets/images/image08.webp",
    linkedin: "https://www.linkedin.com/in/leonardrinser/",
    active: true,
  },
  {
    id: "marlene-heckl",
    name: "Dr. Marlene Heckl",
    role: "Medicine",
    bio: "Marlene is a medical doctor (psychiatry/neurology) and freelance science journalist, she loves to bring medical professionals and techies together to create the healthcare solutions of tomorrow.",
    image: "/assets/images/image03.webp",
    linkedin: "https://www.linkedin.com/in/marlene-heckl/",
    active: true,
  },
  {
    id: "richard-gaus",
    name: "Dr. Richard Gaus",
    role: "Medicine and Software Engineering",
    bio: "Richard is a medical resident at LMU Klinikum, a master's student in Robotics & AI at TUM, and a visionary professional committed to realizing technology's potential to make healthcare more effective, user-friendly, and humane for everyone.",
    image: "/assets/images/image10.webp",
    linkedin: "https://www.linkedin.com/in/richardgaus/",
    active: true,
  },
  {
    id: "philipp-zagar",
    name: "Philipp Zagar",
    role: "Software Engineer / Research Fellow",
    bio: "Philipp is a Software Engineer at Apple and a Research Fellow at Stanford Biodesign, focused on digital health software that integrates connected devices and interoperability standards.",
    image: "/assets/images/image09.webp",
    linkedin: "https://www.linkedin.com/in/pzagar/",
    active: true,
  },
];
