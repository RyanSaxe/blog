// Site-wide names and links. The writing section's name and address live here only.
export const WRITING = {
  name: "Writing",
  path: "/writing/",
  subtitle: "Essays, articles and podcasts",
};

/** The opening line, under your name in the header on every page. */
export const TAGLINE = "I’m obsessed with how people work with AI, and I build things to find out.";

/** The short paragraph the opening line opens into when a visitor clicks it. */
export const TAGLINE_MORE =
  "My day job is machine learning that has to work at scale and still make sense to the people who rely on it. The rest of my time goes to whatever I’m obsessed with. Lately that’s AI agents: how people work with them, and how they work with each other. For much longer it’s been Magic: The Gathering, which is how I ended up with over 400 articles, a drafting bot that reached Mythic, and a format of my own.";

export const SOCIAL = [
  { label: "GitHub", href: "https://github.com/RyanSaxe" },
  { label: "X", href: "https://x.com/rcsaxe" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ryancsaxe" },
  { label: "RSS", href: "/rss.xml" },
];

export type Section = "projects" | "writing" | "about";

export const NAV: { section: Section; label: string; href: string }[] = [
  { section: "projects", label: "Projects", href: "/projects/" },
  { section: "writing", label: WRITING.name, href: WRITING.path },
  { section: "about", label: "About", href: "/about/" },
];
