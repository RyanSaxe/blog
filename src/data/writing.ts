import type { CardItem } from "./cards";

const SCG = "https://articles.starcitygames.com/";

export const writing: CardItem[] = [
  {
    id: "transparent-nn",
    title: "Designing Transparent Neural Networks",
    sentence: "Neural networks designed to be as transparent as linear and additive models.",
    year: "Mar 2021",
    fact: "Essay",
    gallery: [
      { name: "w-transparent", dark: true, alt: "Figure: linear models nested inside GLMs, GAMs and neural networks", caption: "Where does a linear model end and a neural network begin?" },
      { name: "w-splines", dark: true, alt: "Figure: a spline fit to a periodic function, and 24 cubic B-splines", caption: "How does a GAM fit a curve?" },
    ],
    paras: [
      "Generalized linear and additive models are well-established, interpretable approaches to supervised learning.",
      "The essay connects these approaches to the building blocks of neural networks, and shows that it is possible to design neural networks that are just as transparent.",
    ],
    facts: [
      ["Published", "March 4, 2021"],
      ["Kind", "Essay"],
    ],
    actions: [{ label: "Read the essay", href: "/blog/transparent-nn/" }],
  },
  {
    id: "linear-nn",
    title: "From Linear Models to Neural Networks",
    sentence: "How neural networks work, explained with only the math of linear models.",
    year: "Mar 2021",
    fact: "Essay",
    gallery: [{ name: "w-linear", dark: true, alt: "Figure: a small neural network with inputs x1 to xN", caption: "A neural network with one hidden layer" }],
    paras: [
      "Neural networks are a popular machine learning algorithm, and notorious for being difficult to interpret.",
      "It is possible to understand how they work with only the math background of linear models.",
    ],
    facts: [
      ["Published", "March 3, 2021"],
      ["Kind", "Essay"],
    ],
    actions: [{ label: "Read the essay", href: "/blog/linear-nn/" }],
  },
  {
    id: "starcitygames",
    title: "StarCityGames",
    sentence: "Over 400 articles about Magic: The Gathering, written from 2016 to 2022.",
    year: "2016–2022",
    fact: "Columnist",
    gallery: [
      { name: "w-scg", dark: true, alt: "Draft Navigation: From Picks To Paths, on StarCityGames", caption: "Draft Navigation: From Picks To Paths" },
      { name: "w-scg-fund", dark: true, alt: "Limited Fundamentals: Maximizing For Your Own Preferences, on StarCityGames", caption: "Limited Fundamentals: Maximizing For Your Own Preferences" },
      { name: "w-scg-mist", dark: true, alt: "Don’t Make Constructed Mistakes In Limited, on StarCityGames", caption: "Don’t Make Constructed Mistakes In Limited" },
    ],
    paras: [
      "I wrote for StarCityGames from November 2016 to February 2022.",
      "Draft Navigation shows how to go from picking cards to picking build paths. Limited Level-Ups and Lucky Paper Radio both came back to it in later episodes.",
    ],
    facts: [
      ["Years", "2016 to 2022"],
      ["Articles", "400+"],
    ],
    list: {
      title: "Selected articles",
      items: [
        { label: "Draft Navigation: From Picks To Paths", meta: "May 29, 2020", href: SCG + "magic-the-gathering/premium/saxe-article-2/" },
        { label: "Limited Fundamentals: Maximizing For Your Own Preferences", meta: "Dec 7, 2017", href: SCG + "articles/limited-fundamentals-maximizing-for-your-own-preferences/" },
        { label: "Don’t Make Constructed Mistakes In Limited", meta: "Mar 21, 2019", href: SCG + "articles/dont-make-constructed-mistakes-in-limited/" },
      ],
    },
    actions: [{ label: "All articles on StarCityGames", href: SCG + "author/ryan-saxe/" }],
  },
  {
    id: "the-540",
    title: "The 540",
    sentence: "I co-hosted 14 episodes of StarCityGames’ Cube podcast with Ryan Overturf.",
    year: "2021–2022",
    fact: "Co-host",
    gallery: [
      { name: "w-540", dark: true, alt: "The 540 podcast logo", caption: "The 540, StarCityGames’ Cube podcast" },
      { name: "w-540-og", dark: true, alt: "The card for the episode The Art Of Joyful Drafting", caption: "The Art Of Joyful Drafting" },
    ],
    paras: [
      "The 540 is StarCityGames’ podcast about Cube. Ryan Overturf and I hosted it together for 14 episodes, from November 2021 to February 2022.",
    ],
    facts: [
      ["Co-host", "Nov 2021 to Feb 2022"],
      ["Episodes", "14, with Ryan Overturf"],
    ],
    list: {
      title: "Listen",
      items: [{ label: "The Art Of Joyful Drafting", meta: "Jan 20, 2022", href: SCG + "podcasts/the-540-the-art-of-joyful-drafting/" }],
    },
    actions: [{ label: "All episodes of The 540", href: SCG + "author/the-540/" }],
  },
  {
    id: "lords-of-limited",
    title: "Lords of Limited",
    sentence: "Three guest episodes: drafting with preferences, drafting aggro and bot design.",
    year: "2017–2019",
    fact: "First repeat guest",
    gallery: [{ name: "w-lol", dark: true, alt: "The Lords of Limited podcast cover", caption: "Lords of Limited" }],
    paras: [
      "I was a guest on Lords of Limited three times. On episode 77 I became the show’s first repeat guest, in an episode about drafting aggro.",
      "In episode 129, I talk about my own Magic bot and how it approaches drafting.",
    ],
    facts: [
      ["Years", "2017 to 2019"],
      ["Role", "Guest"],
    ],
    list: {
      title: "Episodes",
      items: [
        { label: "26 · Drafting With Preferences", meta: "Dec 25, 2017", href: "https://audioboom.com/posts/7969631-lords-of-limited-26-ryan-saxe-drafting-with-preferences" },
        { label: "77 · Drafting Aggro", meta: "Dec 17, 2018", href: "https://audioboom.com/posts/7969578-lords-of-limited-77-drafting-aggro-with-ryan-saxe" },
        { label: "129 · Bot Design", meta: "Dec 16, 2019", href: "https://audioboom.com/posts/7969523-lords-of-limited-129-bot-design-with-ryan-saxe" },
      ],
    },
    actions: [],
  },
  {
    id: "limited-level-ups",
    title: "Limited Level-Ups",
    sentence: "Why “forcing” in draft gets a bad name, and the art of doing it well.",
    year: "2020–2024",
    fact: "5 episodes",
    gallery: [{ name: "w-llu", dark: true, alt: "The Limited Level-Ups podcast cover", caption: "Limited Level-Ups" }],
    paras: [
      "Episode 81 is about the art of forcing in draft, and why the word “forcing” carries such a negative connotation.",
      "My Lucky Paper Radio episode, In Defense of Forcing, comes back to the same topic.",
    ],
    facts: [
      ["Years", "2020 to 2024"],
      ["Host", "Alex Nikolic"],
    ],
    list: {
      title: "Episodes",
      items: [
        { label: "81 · The Art of Forcing", meta: "Mar 12, 2022", href: "https://limitedlevelups.libsyn.com/limited-level-ups-81-the-art-of-forcing-with-ryan-saxe" },
        { label: "31 · From Picks to Paths, a Conversation", meta: "Jul 31, 2020" },
      ],
      note: "And three more, from 2021 to 2024.",
    },
    actions: [],
  },
  {
    id: "lucky-paper-radio",
    title: "Lucky Paper Radio",
    sentence: "What low-powered cubes can learn from how Limited sets are designed.",
    year: "2023–2024",
    fact: "Cube design",
    gallery: [{ name: "w-lpr", dark: true, alt: "The Lucky Paper Radio podcast cover", caption: "Lucky Paper Radio" }],
    paras: [
      "My most recent visit, episode 221, is about a Magic format I designed, inspired by auto battlers.",
      "Earlier episodes covered low-powered cube design and forcing.",
    ],
    facts: [
      ["Years", "2023 to 2024"],
      ["Hosts", "Andy Mangold and Anthony Mattox"],
    ],
    list: {
      title: "Episodes",
      items: [
        { label: "140 · Cube and the Soul of Limited", meta: "Mar 13, 2023", href: "https://luckypaper.co/podcast/140-cube-and-the-soul-of-limited-with-ryan-saxe/" },
        { label: "153 · In Defense of Forcing", meta: "Jun 12, 2023", href: "https://luckypaper.co/podcast/153-in-defense-of-forcing-how-to-draft-cube-successfully-with-ryan-saxe/" },
        { label: "221 · Ryan Saxe’s Auto Battler Inspired Format", meta: "Oct 14, 2024" },
      ],
    },
    actions: [],
  },
  {
    id: "draftsim",
    title: "Bot Drafting the Hard Way",
    sentence: "A bot, built from over 80,000 drafts, that understands archetypes and stays open.",
    year: "Jan 2020",
    fact: "Bot design",
    gallery: [{ name: "w-draftsim", dark: true, alt: "Draftsim’s title card for Bot Drafting the Hard Way, by Ryan Saxe", caption: "Draftsim’s title card for the article" }],
    paras: [
      "The full title is “Bot Drafting the Hard Way: A New Drafting Model for Archetypes and Staying Open”.",
      "The article analyzes over 80,000 Draftsim drafts to create a drafting bot that both understands archetypes and knows how to stay open during a draft.",
    ],
    facts: [
      ["Published", "January 14, 2020"],
      ["Outlet", "Draftsim"],
    ],
    actions: [{ label: "Read on Draftsim", href: "https://draftsim.com/ryan-saxe-bot-model/" }],
  },
];
