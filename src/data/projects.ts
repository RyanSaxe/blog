import type { CardItem } from "./cards";

const GH = "https://github.com/RyanSaxe/";

export const projects: CardItem[] = [
  {
    id: "gaia",
    title: "Gaia",
    sentence: "Turns a codebase into a world you can walk through.",
    year: "2026",
    fact: "Health follows code quality",
    gallery: [
      { name: "gaia-world", alt: "A sunlit village with a mill and a stone tower, rendered by Gaia from a codebase", caption: "A village Gaia built from a codebase" },
      { name: "gaia-journal", alt: "The journal page for buildSite: a painted dead tree beside its code and its health scores", caption: "The journal page for one function: its code, its scores and a painting of it" },
      { name: "gaia-map", alt: "An illustrated map with regions named Packages, Engine, Search, Apps and Extensions", caption: "The map of the whole land, colored by health" },
      { name: "gaia-dusk", alt: "A field at dusk with half-timbered houses", caption: "A field at dusk" },
    ],
    paras: [
      "Gaia turns a codebase into a world you can walk through. Folders become lands, and each file or function stands on them at a size set by its importance and a health set by its quality.",
      "A language model scores every definition on ten criteria, such as readability, coupling and testability. Tap any object to open its journal page, or press M for an illustrated map of the whole land. Fixing the code heals the tree.",
    ],
    facts: [
      ["Year", "2026"],
      ["Cost", "About 35 cents of model calls to build a world from 68k lines"],
      ["Stack", "TypeScript and a Rust engine"],
    ],
    actions: [{ label: "Code on GitHub", href: GH + "gaia" }],
  },
  {
    id: "nightly",
    title: "The Nightly Build",
    sentence: "Turns a GitHub repository into a personal newspaper that an AI writes and publishes.",
    year: "2026",
    fact: "326 articles published",
    gallery: [
      { name: "nb-paper", dark: true, alt: "The front page of my edition of The Nightly Build on November 8, 2026", caption: "The front page of my paper" },
      { name: "nb-article", dark: true, alt: "An article on a phone, with its summary and a box titled Why this matters", caption: "An article on a phone" },
      { name: "nb-directory", dark: true, alt: "The directory of every paper, with a search box and a grid of articles", caption: "The directory of every paper" },
      { name: "nb-arch", dark: true, alt: "Diagram: an orchestrator starts isolated article runs with a researcher, writer and editor, and each run ends in a pull request", caption: "How one article is written and published" },
    ],
    paras: [
      "The Nightly Build turns a GitHub repository into a personal newspaper. You fork it and ask your AI assistant for an article on any topic. Separate researcher, writer and editor agents write it and check its citations, and it publishes to your own GitHub Pages site, on a schedule if you want one.",
      "There is no backend and no new account. Each article reaches the site only as a pull request that passes a validation check.",
    ],
    facts: [
      ["Years", "2026 to now"],
      ["My paper", "326 articles in 36 series, citing 3,417 sources"],
      ["Per article", "About 45 minutes of agent time"],
    ],
    actions: [
      { label: "Read my newspaper", href: "https://ryansaxe.github.io/the-nightly-build/" },
      { label: "Browse all the newspapers", href: "https://the-nightly-build.github.io/" },
      { label: "Code on GitHub", href: "https://github.com/the-nightly-build/the-nightly-build" },
    ],
  },
  {
    id: "pair",
    title: "pair",
    logo: "pair",
    sentence: "Work with an agent in the browser: plan a change, build it, and explain it.",
    year: "2026",
    fact: "11 releases on npm",
    gallery: [
      { name: "pair-illus", dark: true, alt: "pair: commands in a terminal, and a decision page with a comment thread in the browser", caption: "The agent publishes pages; you comment and choose in the browser" },
      { name: "pair-page", dark: true, alt: "A page with code, a three-way choice and a comment thread", caption: "A page with code, a choice and a thread" },
      { name: "pair-work", dark: true, alt: "Three phone screens: propose work, start it, and watch its progress", caption: "Proposing work and watching it run, on a phone" },
      { name: "pair-flow", dark: true, alt: "Diagram: explain, decide, plan and build, over a loop of rounds", caption: "A session works in rounds" },
    ],
    paras: [
      "pair lets you work with a coding agent in the browser. The agent publishes pages that explain code, lay out decisions and plan the work, and it edits your project only for the work you approve.",
      "You work in rounds. You read the pages, select any word or line to comment, choose between options and send. A small local server wakes the agent, and it starts the next round from what you sent.",
    ],
    facts: [
      ["Year", "2026"],
      ["Install", "npm install -g @ryansaxe/pair"],
      ["Releases", "11 on npm, 0.1.0 to 0.5.0"],
    ],
    actions: [
      { label: "Code on GitHub", href: GH + "pair" },
      { label: "pair on npm", href: "https://www.npmjs.com/package/@ryansaxe/pair" },
    ],
  },
  {
    id: "byor",
    title: "byor",
    logo: "byor",
    sentence: "Custom code rules for the conventions your linter won’t enforce.",
    year: "2026",
    fact: "Runs in editors, CI and agents",
    gallery: [
      { name: "byor-edit", dark: true, alt: "An agent’s edit, flagged by byor’s post-edit hook and then fixed", caption: "An agent’s edit, flagged by the post-edit hook and then fixed" },
      { name: "byor-gate", dark: true, alt: "The pre-command gate stopping pip install, using the no-pip-install example rule", caption: "The pre-command gate stopping pip install" },
    ],
    paras: [
      "byor lets you write the code rules a general linter leaves out. A rule written once runs in your editor, in the terminal, in CI and inside your AI agent’s loop, so an agent that breaks a rule is told how to fix it while it is still working.",
      "A rule can be an ast-grep pattern, a check that runs any linter, type checker or script, or a command rule. A pre-command gate stops shell commands like pip install before they run.",
    ],
    facts: [
      ["Year", "2026"],
      ["Agents", "Hooks for Claude Code, Codex and Copilot CLI"],
      ["Releases", "11 on PyPI, 0.1.0 to 0.4.0"],
    ],
    actions: [
      { label: "Code on GitHub", href: GH + "byor" },
      { label: "byor on PyPI", href: "https://pypi.org/project/byor/" },
    ],
  },
  {
    id: "cubecobra",
    title: "CubeCobra ML system",
    sentence: "The machine learning behind CubeCobra’s draft bots and card recommendations.",
    year: "2020–2026",
    fact: "Used by over 100k players",
    gallery: [
      { name: "cc-search", dark: true, alt: "CubeCobra’s Smart Search ranking creature cards by how well each fits a cube", caption: "Smart Search ranks a card search by how well each card fits the cube" },
      { name: "cc-home", dark: true, alt: "The CubeCobra home page", caption: "cubecobra.com" },
    ],
    paras: [
      "The machine learning behind CubeCobra’s card recommendations, Smart Search, draft bots and deck building. One shared encoder maps a set of cards into a 128-dimensional space, and four heads read it: cube recommendations, draft picks, deck building and card correlations.",
      "The first version, in 2020, was a denoising autoencoder over cubes stored as on and off vectors of cards. The current model trains on CubeCobra’s public export of every cube, draft pick and finished deck.",
    ],
    facts: [
      ["Years", "2020 to 2026"],
      ["Players", "Over 100k"],
      ["Model", "One shared encoder and four heads"],
    ],
    actions: [
      { label: "Open cubecobra.com", href: "https://cubecobra.com/" },
      { label: "Model on GitHub", href: "https://github.com/dekkerglen/CubeCobraML" },
    ],
  },
  {
    id: "mtg",
    title: "MTG drafting AI",
    sentence: "A transformer that drafts and builds decks in Magic: The Gathering.",
    year: "2021–2022",
    fact: "Mythic in 23 drafts",
    gallery: [
      { name: "mtg-rank", alt: "Magic Arena profile of RyanSaxe AI: January 2022 season, Mythic limited rank #106", caption: "The account’s January 2022 season rank" },
      { name: "mtg-arch", dark: true, alt: "The README’s diagram of the model: a pack encoder and a pick decoder", caption: "The model: an encoder reads the pack, a decoder reads the picks so far" },
    ],
    paras: [
      "A transformer that drafts and builds decks in Magic: The Gathering, trained on public 17lands draft and game data. An encoder reads the cards in the current pack, a decoder reads the picks made so far, and the output is the next pick.",
      "It reached Mythic on Magic Arena in 23 drafts with a 66% win rate. Its highest rank within Mythic was #27.",
    ],
    facts: [
      ["Years", "2021 to 2022"],
      ["Record", "Mythic in 23 drafts, 66% win rate"],
      ["Highest rank", "#27 within Mythic"],
    ],
    actions: [{ label: "Code on GitHub", href: GH + "mtg" }],
  },
  {
    id: "crucible",
    title: "Crucible",
    sentence: "A Magic: The Gathering format inspired by roguelikes and autobattlers.",
    year: "2026",
    fact: "Built with AI coding agents",
    gallery: [
      { name: "cr-home", dark: true, alt: "The cruciblemtg.com home page: a starting hand of three cards and three lands on a green table", caption: "cruciblemtg.com" },
      { name: "cr-play", dark: true, alt: "The play page, with a Goldfish mode that battles historically winning hands", caption: "Goldfish mode battles historically winning hands" },
    ],
    paras: [
      "Crucible is a Magic: The Gathering format inspired by roguelikes and autobattlers. Players alternate between drafting cards and short battles, the loser of each battle takes poison counters, and the game ends when one player is left.",
      "A game works for any even number of players, best with 2 or 4, and takes about 1.5 hours in paper or 45 minutes online. I built cruciblemtg.com with AI coding agents.",
    ],
    facts: [
      ["Year", "2026"],
      ["Game length", "About 45 minutes online"],
      ["Releases", "27, from January to May 2026"],
    ],
    actions: [
      { label: "Open cruciblemtg.com", href: "https://www.cruciblemtg.com/" },
      { label: "Code on GitHub", href: GH + "magic-the-battling" },
    ],
  },
];
