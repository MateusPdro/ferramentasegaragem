import type { Article, Product } from '../types/index';
import { getVerifiedPriceCents } from './catalog';

export interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function applyPageSeo(meta: PageMetaInput): void {
  const fullTitle = meta.title.includes('Ferramentas & Garagem')
    ? meta.title
    : `${meta.title} | Ferramentas & Garagem`;
  document.title = fullTitle;

  const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('name', 'description', meta.description);
  setMeta('property', 'og:title', fullTitle);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:type', meta.type ?? 'website');
  setMeta('name', 'twitter:title', fullTitle);
  setMeta('name', 'twitter:description', meta.description);

  const canonicalUrl = `${window.location.origin}${meta.path}`;
  setMeta('property', 'og:url', canonicalUrl);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);

  const existingJsonLd = document.getElementById('fg-jsonld');
  if (existingJsonLd) existingJsonLd.remove();

  if (meta.jsonLd) {
    const script = document.createElement('script');
    script.id = 'fg-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(meta.jsonLd);
    document.head.appendChild(script);
  }
}

export function buildProductJsonLd(product: Product, origin: string): Array<Record<string, unknown>> {
  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    model: product.model,
    description: product.shortDescription,
    image: product.imageUrl.startsWith('http') ? product.imageUrl : `${origin}${product.imageUrl}`,
    url: `${origin}/produto/${product.slug}`,
  };

  // Only emit Offer structured data when a real, verified price is present
  const verifiedPriceCents = getVerifiedPriceCents(product);
  if (verifiedPriceCents !== null) {
    productSchema.offers = {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: (verifiedPriceCents / 100).toFixed(2),
      availability: 'https://schema.org/InStock',
    };
  }

  const schemas: Array<Record<string, unknown>> = [
    productSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${origin}/` },
        { '@type': 'ListItem', position: 2, name: product.specs.categoria, item: `${origin}/categoria/${product.categorySlug}` },
        { '@type': 'ListItem', position: 3, name: product.name, item: `${origin}/produto/${product.slug}` },
      ],
    },
  ];

  if (product.faq && product.faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: product.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return schemas;
}

export function buildArticleJsonLd(article: Article, origin: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    image: article.imageUrl.startsWith('http') ? article.imageUrl : `${origin}${article.imageUrl}`,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Ferramentas & Garagem',
    },
    mainEntityOfPage: `${origin}/artigo/${article.slug}`,
  };
}
