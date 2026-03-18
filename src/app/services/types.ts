export interface Deliverable {
  label: string;
  detail?: string;
}

export interface AddOn {
  title: string;
  price: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Package {
  id: string;
  category: "video-marketing" | "aerial-marketing";
  title: string;
  tagline: string;
  description: string;
  featured?: boolean;
  pricing: { startingAt?: number; upTo?: number; label?: string };
  timeline: { minDays?: number; maxDays?: number; label?: string };
  deliverables: Deliverable[];
  addOns: AddOn[];
  faq: FAQ[];
}