import type { AffiliateLink, Article, Category, Product } from '../types/index';

export interface SearchFilterOptions {
  query?: string;
  categorySlug?: string;
  subcategory?: string;
  brand?: string;
  toolType?: string;
  application?: string;
  priceRange?: 'all' | 'under-300' | '300-700' | 'over-700' | 'verified-only';
}

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function slugify(value: string): string {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getProductSubcategory(product: Pick<Product, 'subcategory' | 'toolType'>): string {
  return (product.subcategory || product.toolType || '').trim();
}

export function getPrimaryAffiliateLink(product: Product): AffiliateLink | null {
  if (!product.affiliateLinks || product.affiliateLinks.length === 0) {
    return null;
  }
  const activeWithUrl = product.affiliateLinks.filter((l) => isValidAffiliateUrl(l.url));
  const pool = activeWithUrl.length > 0 ? activeWithUrl : product.affiliateLinks;
  return pool.find((l) => l.isPrimary) ?? pool[0] ?? null;
}

export function isValidAffiliateUrl(url: string | undefined | null): boolean {
  if (!url || !url.trim()) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function formatBrlFromCents(cents: number | null | undefined): string | null {
  if (typeof cents !== 'number' || !Number.isFinite(cents) || cents <= 0) {
    return null;
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}

export function formatSpecValue(value: string | undefined | null): string {
  if (!value || !value.trim()) {
    return 'Não informado';
  }
  return value.trim();
}

export function getVerifiedPriceCents(product: Product): number | null {
  const link = getPrimaryAffiliateLink(product);
  if (!link || typeof link.priceCents !== 'number' || link.priceCents <= 0) {
    return null;
  }
  return link.priceCents;
}

export function filterProducts(
  products: Product[],
  options: SearchFilterOptions,
  includeDrafts = false
): Product[] {
  const q = normalizeText(options.query ?? '');
  return products.filter((product) => {
    if (!includeDrafts && product.status !== 'published') return false;
    if (options.categorySlug && options.categorySlug !== 'all' && product.categorySlug !== options.categorySlug) {
      return false;
    }
    if (
      options.subcategory &&
      options.subcategory !== 'all' &&
      normalizeText(getProductSubcategory(product)) !== normalizeText(options.subcategory)
    ) {
      return false;
    }
    if (options.brand && options.brand !== 'all' && normalizeText(product.brand) !== normalizeText(options.brand)) {
      return false;
    }
    if (options.toolType && options.toolType !== 'all' && normalizeText(product.toolType) !== normalizeText(options.toolType)) {
      return false;
    }
    if (
      options.application &&
      options.application !== 'all' &&
      normalizeText(product.application) !== normalizeText(options.application)
    ) {
      return false;
    }

    if (options.priceRange && options.priceRange !== 'all') {
      const priceCents = getVerifiedPriceCents(product);
      if (options.priceRange === 'verified-only' && priceCents === null) return false;
      if (options.priceRange === 'under-300' && (priceCents === null || priceCents >= 30000)) return false;
      if (options.priceRange === '300-700' && (priceCents === null || priceCents < 30000 || priceCents > 70000)) {
        return false;
      }
      if (options.priceRange === 'over-700' && (priceCents === null || priceCents <= 70000)) return false;
    }

    if (!q) return true;

    const haystack = normalizeText(
      [
        product.name,
        product.title,
        product.brand,
        product.model,
        product.subcategory ?? '',
        product.toolType,
        product.application,
        product.shortDescription,
        product.highlights.join(' '),
      ].join(' ')
    );

    return haystack.includes(q);
  });
}

export function filterArticles(
  articles: Article[],
  query = '',
  categorySlug = 'all',
  includeDrafts = false
): Article[] {
  const q = normalizeText(query);
  return articles.filter((article) => {
    if (!includeDrafts && article.status !== 'published') return false;
    if (categorySlug && categorySlug !== 'all' && article.categorySlug !== categorySlug) {
      return false;
    }
    if (!q) return true;
    const haystack = normalizeText(
      [article.title, article.summary, article.keywords.join(' '), article.articleType].join(' ')
    );
    return haystack.includes(q);
  });
}

export function toggleCompareSelection(
  currentIds: string[],
  candidateId: string,
  allProducts: Product[],
  maxItems = 3
): { nextIds: string[]; error: string | null } {
  if (currentIds.includes(candidateId)) {
    return {
      nextIds: currentIds.filter((id) => id !== candidateId),
      error: null,
    };
  }
  if (currentIds.length >= maxItems) {
    return {
      nextIds: currentIds,
      error: `Você pode comparar no máximo ${maxItems} produtos por vez.`,
    };
  }

  const candidate = allProducts.find((p) => p.id === candidateId);
  if (!candidate) {
    return { nextIds: currentIds, error: 'Produto não encontrado.' };
  }

  if (currentIds.length > 0) {
    const first = allProducts.find((p) => p.id === currentIds[0]);
    if (first && first.categorySlug !== candidate.categorySlug) {
      return {
        nextIds: currentIds,
        error: 'Selecione produtos da mesma categoria para comparar especificações equivalentes.',
      };
    }
    if (
      first &&
      first.subcategory &&
      candidate.subcategory &&
      normalizeText(first.subcategory) !== normalizeText(candidate.subcategory)
    ) {
      return {
        nextIds: currentIds,
        error: `Selecione ferramentas do mesmo tipo (${first.subcategory}) para evitar comparações incompatíveis.`,
      };
    }
  }

  return {
    nextIds: [...currentIds, candidateId],
    error: null,
  };
}

export function getDistinctFilterValues(
  products: Product[],
  categorySlug?: string,
  subcategory?: string
): {
  brands: string[];
  subcategories: string[];
  toolTypes: string[];
  applications: string[];
} {
  const categoryScoped = products.filter(
    (p) => p.status === 'published' && (!categorySlug || categorySlug === 'all' || p.categorySlug === categorySlug)
  );
  const subScoped =
    subcategory && subcategory !== 'all'
      ? categoryScoped.filter((p) => normalizeText(getProductSubcategory(p)) === normalizeText(subcategory))
      : categoryScoped;

  const uniq = (values: string[]) =>
    Array.from(new Set(values.map((v) => v.trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'pt-BR'));

  return {
    brands: uniq(subScoped.map((p) => p.brand)),
    subcategories: uniq(categoryScoped.map((p) => getProductSubcategory(p))),
    toolTypes: uniq(subScoped.map((p) => p.toolType)),
    applications: uniq(subScoped.map((p) => p.application)),
  };
}

export function buildComparisonRows(
  products: Product[],
  categories: Category[]
): Array<{ key: string; label: string; values: string[]; hasDifferences: boolean }> {
  if (products.length === 0) return [];
  const catMap = new Map(categories.map((c) => [c.slug, c.name]));

  const rows: Array<{ key: string; label: string; extract: (p: Product) => string }> = [
    { key: 'brand', label: 'Marca', extract: (p) => formatSpecValue(p.brand) },
    { key: 'model', label: 'Modelo', extract: (p) => formatSpecValue(p.model) },
    {
      key: 'category',
      label: 'Categoria',
      extract: (p) => catMap.get(p.categorySlug) ?? formatSpecValue(p.specs.categoria),
    },
    { key: 'subcategory', label: 'Subcategoria / Tipo', extract: (p) => formatSpecValue(getProductSubcategory(p)) },
    { key: 'potencia', label: 'Potência', extract: (p) => formatSpecValue(p.specs.potencia) },
    { key: 'voltagem', label: 'Voltagem / Bateria', extract: (p) => formatSpecValue(p.specs.voltagem) },
    { key: 'torque', label: 'Torque', extract: (p) => formatSpecValue(p.specs.torque) },
    { key: 'rotacao', label: 'Rotação', extract: (p) => formatSpecValue(p.specs.rotacao) },
    { key: 'pressao', label: 'Pressão', extract: (p) => formatSpecValue(p.specs.pressao) },
    { key: 'vazao', label: 'Vazão', extract: (p) => formatSpecValue(p.specs.vazao) },
    { key: 'capacidade', label: 'Capacidade', extract: (p) => formatSpecValue(p.specs.capacidade) },
    { key: 'peso', label: 'Peso', extract: (p) => formatSpecValue(p.specs.peso) },
    { key: 'dimensoes', label: 'Dimensões / Medidas', extract: (p) => formatSpecValue(p.specs.dimensoes) },
    { key: 'acessorios', label: 'Acessórios inclusos', extract: (p) => formatSpecValue(p.specs.acessoriosInclusos) },
    { key: 'garantia', label: 'Garantia', extract: (p) => formatSpecValue(p.specs.garantia) },
    {
      key: 'preco',
      label: 'Preço verificado',
      extract: (p) => formatBrlFromCents(getVerifiedPriceCents(p)) ?? 'Consultar na oferta',
    },
  ];

  // Omit rows where all compared products have "Não informado" for optional technical specs
  const alwaysShow = new Set(['brand', 'model', 'category', 'subcategory', 'peso', 'acessorios', 'garantia', 'preco']);

  return rows
    .map((row) => {
      const values = products.map((p) => row.extract(p));
      const distinct = new Set(values.map((v) => normalizeText(v)));
      return {
        key: row.key,
        label: row.label,
        values,
        hasDifferences: products.length > 1 && distinct.size > 1,
      };
    })
    .filter((row) => alwaysShow.has(row.key) || row.values.some((v) => v !== 'Não informado'));
}
