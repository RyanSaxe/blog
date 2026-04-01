export interface Project {
  name: string;
  description: string;
  url?: string;
  github?: string;
  tags?: string[];
}

export const projects: Project[] = [
  {
    name: "MTG AI Drafting Bot",
    description:
      "An AI system for drafting in Magic: the Gathering that reached rank #27 in the world — the first case of AI successfully competing in the game.",
    github: "https://github.com/RyanSaxe/mtg",
    tags: ["ML", "Games", "Python"],
  },
  // Add more projects here
];
