export interface TimelineEntry {
  title: string;
  organization: string;
  description?: string;
  startDate: string;
  endDate?: string;
  link?: string;
}

export const timeline: TimelineEntry[] = [
  {
    title: "Global Director, Data & Analytics",
    organization: "AB InBev",
    description:
      "Chief Data Scientist for Global Analytics, responsible for the science and engineering behind everything from forecasting to agentic dev tools.",
    startDate: "Nov 2024",
  },
  {
    title: "Principal Machine Learning Engineer",
    organization: "AB InBev",
    description:
      "Designed the framework that trains hierarchical models at global scale, used by products across the company, from forecasting to marketing.",
    startDate: "Jan 2023",
    endDate: "Nov 2024",
  },
  {
    title: "Senior Engineering Manager",
    organization: "AB InBev",
    description:
      "Led the team that built in-house marketing mix models as custom differentiable programs in TensorFlow.",
    startDate: "Mar 2021",
    endDate: "Jan 2023",
  },
  {
    title: "Senior Machine Learning Research Scientist, Ecommerce",
    organization: "PepsiCo",
    description:
      "Invented similarity regularization, granted as a US patent, which makes similar products behave alike across pricing and marketing models.",
    startDate: "Oct 2020",
    endDate: "Mar 2021",
    link: "https://patents.google.com/patent/US12333399B2",
  },
  {
    title: "Data Scientist, Ecommerce",
    organization: "PepsiCo",
    description:
      "Built a marketing attribution model on a generalized additive neural network with economic priors, and product embeddings adapted from DeepWalk.",
    startDate: "Jul 2019",
    endDate: "Oct 2020",
  },
  {
    title: "Technical Research Assistant, RiskEcon Lab",
    organization: "NYU Courant Institute",
    description:
      "Researched machine vision for gait and movement quality, and wrote a survey on gait classification.",
    startDate: "Sep 2017",
    endDate: "Jul 2019",
    link: "https://arxiv.org/pdf/2012.14465.pdf",
  },
  {
    title: "Master of Science in Computer Science",
    organization: "New York University",
    description:
      "Wrote a thesis on classifying the quality of movement from motion capture, which Courant chose for publication.",
    startDate: "Sep 2017",
    endDate: "Dec 2018",
  },
  {
    title: "Bachelor of Arts in Mathematics & Computer Science",
    organization: "New York University",
    description:
      "Alongside it, built a classifier for fashion products at StyleSage and analyzed fMRI data for a poster on brain entropy.",
    startDate: "Sep 2013",
    endDate: "May 2017",
  },
];
