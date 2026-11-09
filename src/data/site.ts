// Site-wide names and links. The writing section's name and address live here only.
export const WRITING = {
  name: "Writing",
  path: "/writing/",
  subtitle: "Essays, articles and podcasts",
};

/** The opening line, under your name in the header on every page. */
export const TAGLINE = "I design interpretable machine learning and AI systems, and I build tools for working with AI agents.";

/** The short paragraph the opening line opens into when a visitor clicks it. */
export const TAGLINE_MORE =
  "I’ve spent my career building machine learning that has to work at scale and still make sense to the people who rely on it. These days I’m obsessed with how people work with agents, and how agents work with each other, so I build tools to find out. I write to understand what I build, which is how I ended up with over 400 articles about Magic: The Gathering.";

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
