export interface Project {
  name: string;
  description: string;
  url?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    name: "CubeCobra ML System",
    description:
      "Central ML system powering card recommendations, search, deckbuilding, and drafting on CubeCobra.com. Features a shared encoder with specialized decoders for each downstream use case. Used by over 100k Magic: the Gathering players worldwide.",
    url: "https://cubecobra.com",
    github: "https://github.com/dekkerglen/CubeCobraML",
  },
  {
    name: "MTG AI Drafting Bot",
    description:
      "An AI system for drafting in Magic: the Gathering that reached rank #27 in the world — the first case of AI successfully competing in the game.",
    github: "https://github.com/RyanSaxe/mtg",
  },
  {
    name: "Crucible",
    description:
      "A new Magic: the Gathering format inspired by roguelikes and autobattlers. Built entirely with AI agents.",
    url: "https://cruciblemtg.com",
    github: "https://github.com/RyanSaxe/magic-the-battling",
  },
];
