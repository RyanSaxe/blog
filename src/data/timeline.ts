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
    title: "Global Principal Data Scientist",
    organization: "AB-InBev",
    description:
      "Tech lead of tech leads across all global products pertaining to commercial applications of machine learning (sales, marketing, and finance).",
    startDate: "Jan 2023",
  },
  {
    title: "Senior Global Manager of Data Science & Analytics",
    organization: "AB-InBev",
    description:
      "Tech lead and manager for a team of 10 Data Scientists dedicated to ML solutions for marketing efficacy and automated spend allocation.",
    startDate: "Mar 2021",
    endDate: "Jan 2023",
  },
  {
    title: "Senior ML Research Scientist",
    organization: "PepsiCo Ecommerce",
    description:
      "Research in Graph Neural Networks for product introduction, embedding regularization techniques, and transparent neural architectures. Published a patent at the intersection of contrastive loss and anomaly detection.",
    startDate: "Oct 2020",
    endDate: "Mar 2021",
    link: "https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/20220398503",
  },
  {
    title: "Data Scientist",
    organization: "PepsiCo Ecommerce",
    description:
      "Built an internal API for training deep learning systems with economic priors. Designed a multi-modal Graph Embedding model for product similarity.",
    startDate: "Jul 2019",
    endDate: "Oct 2020",
  },
  {
    title: "Master of Science in Computer Science",
    organization: "New York University",
    description:
      "Research in Machine Vision for Gait Recognition and Classification of Pathological Disorders at the RiskEcon Lab for Decision Metrics.",
    startDate: "Sep 2017",
    endDate: "May 2019",
    link: "https://arxiv.org/pdf/2012.14465.pdf",
  },
  {
    title: "Bachelor of Arts in Mathematics & Computer Science",
    organization: "New York University",
    startDate: "Sep 2013",
    endDate: "May 2017",
  },
];
