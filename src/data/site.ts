// Site-wide names and links. The writing section's name lives here only, so a rename is one line.
export const IDEAS = {
  name: "Ideas",
  path: "/ideas/",
  subtitle: "Essays, articles and podcasts",
};

export const SOCIAL = [
  { label: "GitHub", href: "https://github.com/RyanSaxe" },
  { label: "X", href: "https://x.com/rcsaxe" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ryancsaxe" },
  { label: "RSS", href: "/rss.xml" },
];

export type Section = "projects" | "ideas" | "about";

export const NAV: { section: Section; label: string; href: string }[] = [
  { section: "projects", label: "Projects", href: "/projects/" },
  { section: "ideas", label: IDEAS.name, href: IDEAS.path },
  { section: "about", label: "About", href: "/about/" },
];
