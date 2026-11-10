// Site-wide names and links. The writing section's name and address live here only.
export const WRITING = {
  name: "Writing",
  path: "/writing/",
  subtitle: "Essays, articles and podcasts",
};

export const TAGLINE =
  "I love picking apart AI and machine learning systems to understand how they work. This site collects my projects, writing, and whatever else I get a little too interested in.";

export const TAGLINE_MORE =
  "At work, I build large-scale, interpretable AI and machine learning systems that help people make decisions and businesses run. Outside work, there’s dance, Magic: The Gathering, and figuring out fatherhood.";

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
