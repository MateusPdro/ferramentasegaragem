export type PublishStatus = 'published' | 'draft';

export type CategorySlug =
  | 'ferramentas-eletricas'
  | 'ferramentas-manuais'
  | 'equipamentos-automotivos'
  | 'limpeza-e-acessorios'
  | string;

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  imageUrl: string;
  subtopics: string[];
  displayOrder: number;
}

export interface ProductSpecs {
  marca: string;
  modelo: string;
  categoria: string;
  potencia?: string;
  voltagem?: string;
  torque?: string;
  rotacao?: string;
  pressao?: string;
  vazao?: string;
  capacidade?: string;
  peso?: string;
  dimensoes?: string;
  acessoriosInclusos?: string;
  garantia?: string;
  [key: string]: string | undefined;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface AffiliateLink {
  id: string;
  productId: string;
  label: string;
  marketplace: string;
  url: string;
  priceCents: number | null;
  priceUpdatedAt: string | null;
  isPrimary: boolean;
  clicksCount: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  name: string;
  brand: string;
  model: string;
  categorySlug: string;
  subcategory?: string;
  toolType: string;
  application: string;
  shortDescription: string;
  introduction: string;
  imageUrl: string;
  specs: ProductSpecs;
  highlights: string[];
  featuresText: string;
  pros: string[];
  cons: string[];
  targetAudience: string;
  comparisonNotes: string;
  faq: ProductFAQ[];
  mlReferenceUrl?: string;
  ratingInfo?: string;
  salesInfo?: string;
  verifiedAt?: string;
  featured: boolean;
  status: PublishStatus;
  affiliateLinks: AffiliateLink[];
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  articleType: 'guia' | 'comparativo';
  summary: string;
  content: string;
  imageUrl: string;
  keywords: string[];
  readMinutes: number;
  relatedProductSlugs: string[];
  featured: boolean;
  status: PublishStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface AdminStats {
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalCategories: number;
  totalAffiliateClicks: number;
  productsWithAffiliateLinks: number;
  recentClicks: Array<{
    id: string;
    productName: string;
    productSlug: string;
    linkLabel: string;
    clickedAt: string;
  }>;
}
