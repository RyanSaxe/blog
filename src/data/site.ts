// Site-wide names and links. The writing section's name and address live here only.
export const WRITING = {
  name: "Writing",
  path: "/writing/",
  subtitle: "Essays, articles and podcasts",
};

/** The opening line, under your name in the header on every page. */
export const TAGLINE =
  "I'm obsessed about understanding the inner machinations of AI and ML systems. I build systems to further my intuitions of how they work, and I write about what I learn along the way.";

/** The short paragraph the opening line opens into when a visitor clicks it. */
export const TAGLINE_MORE =
  "I love picking apart AI and machine learning systems to understand how they work. This site collects my projects, writing, and whatever else I get a little too interested in.";

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
