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
      "Head of Science and Engineering. Responsible for the technology behind all global analytics products.",
    startDate: "Nov 2024",
  },
  {
    title: "Principal Machine Learning Engineer",
    organization: "AB InBev",
    description:
      "Tech lead for all commercial applications of machine learning (sales, marketing, and finance).",
    startDate: "Jan 2023",
    endDate: "Nov 2024",
  },
  {
    title: "Senior Engineering Manager",
    organization: "AB InBev",
    description:
      "Tech lead Manager for a team dedicated to ML solutions for marketing efficacy and automated spend allocation.",
    startDate: "Mar 2021",
    endDate: "Jan 2023",
  },
  {
    title: "Senior Machine Learning Research Scientist, Ecommerce",
    organization: "PepsiCo",
    description:
      "Research in Graph Neural Networks for product introduction, embedding regularization techniques, and transparent neural architectures. Granted a patent at the intersection of contrastive loss and anomaly detection.",
    startDate: "Oct 2020",
    endDate: "Mar 2021",
    link: "https://patents.google.com/patent/US12333399B2",
  },
  {
    title: "Data Scientist, Ecommerce",
    organization: "PepsiCo",
    description:
      "Built an internal API for training deep learning systems with economic priors. Designed a multi-modal Graph Embedding model for product similarity.",
    startDate: "Jul 2019",
    endDate: "Oct 2020",
  },
  {
    title: "Technical Research Assistant, RiskEcon Lab",
    organization: "NYU Courant Institute",
    description:
      "Research in Machine Vision for Gait Recognition and Classification of Pathological Disorders.",
    startDate: "Sep 2017",
    endDate: "Jul 2019",
    link: "https://arxiv.org/pdf/2012.14465.pdf",
  },
  {
    title: "Master of Science in Computer Science",
    organization: "New York University",
    startDate: "Sep 2017",
    endDate: "Dec 2018",
  },
  {
    title: "Bachelor of Arts in Mathematics & Computer Science",
    organization: "New York University",
    startDate: "Sep 2013",
    endDate: "May 2017",
  },
];
