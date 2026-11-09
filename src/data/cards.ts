// The shape shared by project and idea cards, and by the panel each card opens.

/** An image in public/images/site/<name>-{800,1200}.webp, 3:2, with an optional -dark variant. */
export interface Pic {
  name: string;
  alt: string;
  dark?: boolean;
  caption?: string;
  /** A full-bleed picture: an open panel's image box can be taller than 3:2, and this fills it, cropped, rather than sitting whole on a plate. */
  fill?: boolean;
  /** The color around a screenshot whose border is not the site's plate, light and dark, so the plate around it in a taller box matches. */
  plate?: string;
  plateDark?: string;
}

export interface Action {
  label: string;
  href: string;
}

export interface ListItem {
  label: string;
  meta?: string;
  href?: string;
}

export interface CardItem {
  id: string;
  title: string;
  /** a brand mark shown with the title: byor's sheepdog, or pair's wordmark in place of the title text */
  logo?: "byor" | "pair";
  /** one plain sentence on the card */
  sentence: string;
  year: string;
  fact: string;
  /** the first image is the card cover */
  gallery: Pic[];
  paras: string[];
  facts: [string, string][];
  list?: { title: string; items: ListItem[]; note?: string };
  actions: Action[];
}

export const imgSrc = (name: string, w: 800 | 1200) => `/images/site/${name}-${w}.webp`;
export const imgSet = (name: string) => `${imgSrc(name, 800)} 800w, ${imgSrc(name, 1200)} 1200w`;
