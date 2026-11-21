import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildComparisonRows,
  filterArticles,
  filterProducts,
  formatBrlFromCents,
  formatSpecValue,
  getDistinctFilterValues,
  getPrimaryAffiliateLink,
  isValidAffiliateUrl,
  toggleCompareSelection,
} from './catalog';
import type { Article, Category, Product } from '../types/index';

const sampleCategories: Category[] = [
  {
    id: 'cat-1',
    slug: 'ferramentas-eletricas',
    name: 'Ferramentas elétricas',
    shortName: 'Elétricas',
    description: 'Furadeiras e esmerilhadeiras',
    imageUrl: '/img/1.jpg',
    subtopics: ['Furadeiras'],
    displayOrder: 1,
  },
  {
    id: 'cat-2',
    slug: 'limpeza-e-acessorios',
    name: 'Limpeza e acessórios',
    shortName: 'Limpeza',
    description: 'Lavadoras de alta pressão',
    imageUrl: '/img/2.jpg',
    subtopics: ['Lavadoras'],
    displayOrder: 2,
  },
];

const sampleProducts: Product[] = [
  {
    id: 'p1',
    slug: 'parafusadeira-the-black-tools-tb-21px',
    title: 'Análise da Parafusadeira The Black Tools TB-21PX',
    name: 'Parafusadeira The Black Tools TB-21PX',
    brand: 'The Black Tools',
    model: 'TB-21PX',
    categorySlug: 'ferramentas-eletricas',
    toolType: 'Parafusadeira a bateria',
    application: 'Montagem e alvenaria leve',
    shortDescription: 'Parafusadeira 21V com 2 baterias e 35 Nm.',
    introduction: 'Intro',
    imageUrl: '/img/p1.jpg',
    specs: {
      marca: 'The Black Tools',
      modelo: 'TB-21PX',
      categoria: 'Ferramentas elétricas',
      voltagem: '21V (2 baterias 2.0 Ah)',
      torque: '35 Nm',
      peso: '1,5 kg',
    },
    highlights: ['35 Nm', '2 baterias'],
    featuresText: 'Detalhes',
    pros: ['Duas baterias'],
    cons: ['Torque básico'],
    targetAudience: 'Uso doméstico e manutenção leve',
    comparisonNotes: 'Compara com 12V',
    faq: [],
    featured: true,
    status: 'published',
    affiliateLinks: [
      {
        id: 'l1',
        productId: 'p1',
        label: 'Oferta principal',
        marketplace: 'Mercado Livre',
        url: 'https://mercadolivre.com.br/exemplo',
        priceCents: 28900,
        priceUpdatedAt: '2026-11-18',
        isPrimary: true,
        clicksCount: 4,
      },
    ],
    createdAt: '2026-11-01T10:00:00Z',
    updatedAt: '2026-11-18T10:00:00Z',
  },
  {
    id: 'p2',
    slug: 'esmerilhadeira-bosch-gws-700',
    title: 'Análise da Esmerilhadeira Bosch GWS 700',
    name: 'Esmerilhadeira Angular Bosch GWS 700',
    brand: 'Bosch',
    model: 'GWS 700',
    categorySlug: 'ferramentas-eletricas',
    toolType: 'Esmerilhadeira angular',
    application: 'Corte e desbaste metálico',
    shortDescription: 'Esmerilhadeira 710W para discos de 4.1/2".',
    introduction: 'Intro',
    imageUrl: '/img/p2.jpg',
    specs: {
      marca: 'Bosch',
      modelo: 'GWS 700',
      categoria: 'Ferramentas elétricas',
      potencia: '710 W',
      rotacao: '12.000 rpm',
      peso: '1,7 kg',
    },
    highlights: ['710W'],
    featuresText: 'Detalhes',
    pros: ['Leve e compacta'],
    cons: ['Sem controle eletrônico de velocidade'],
    targetAudience: 'Serralheiros e oficinas',
    comparisonNotes: '',
    faq: [],
    featured: true,
    status: 'published',
    affiliateLinks: [],
    createdAt: '2026-11-01T10:00:00Z',
    updatedAt: '2026-11-18T10:00:00Z',
  },
  {
    id: 'p3',
    slug: 'wap-wl-1800',
    title: 'Análise da Lavadora WAP WL 1800',
    name: 'Lavadora de Alta Pressão WAP WL 1800',
    brand: 'WAP',
    model: 'WL 1800',
    categorySlug: 'limpeza-e-acessorios',
    toolType: 'Lavadora de alta pressão',
    application: 'Limpeza automotiva e residencial',
    shortDescription: 'Lavadora 1400W com 1500 PSI.',
    introduction: 'Intro',
    imageUrl: '/img/p3.jpg',
    specs: {
      marca: 'WAP',
      modelo: 'WL 1800',
      categoria: 'Limpeza e acessórios',
      potencia: '1400 W',
      pressao: '1500 PSI',
      vazao: '360 L/h',
      peso: '3,0 kg',
    },
    highlights: ['1500 PSI'],
    featuresText: 'Detalhes',
    pros: ['Leve'],
    cons: ['Mangueira de 3m'],
    targetAudience: 'Uso residencial',
    comparisonNotes: '',
    faq: [],
    featured: false,
    status: 'published',
    affiliateLinks: [],
    createdAt: '2026-11-01T10:00:00Z',
    updatedAt: '2026-11-18T10:00:00Z',
  },
  {
    id: 'p4',
    slug: 'rascunho-teste',
    title: 'Rascunho',
    name: 'Produto em Rascunho',
    brand: 'Genérica',
    model: 'D-1',
    categorySlug: 'ferramentas-eletricas',
    toolType: 'Parafusadeira',
    application: 'Geral',
    shortDescription: 'Não publicado',
    introduction: 'Intro',
    imageUrl: '/img/p4.jpg',
    specs: { marca: 'Genérica', modelo: 'D-1', categoria: 'Ferramentas elétricas' },
    highlights: [],
    featuresText: '',
    pros: [],
    cons: [],
    targetAudience: '',
    comparisonNotes: '',
    faq: [],
    featured: false,
    status: 'draft',
    affiliateLinks: [],
    createdAt: '2026-11-01T10:00:00Z',
    updatedAt: '2026-11-18T10:00:00Z',
  },
];

const sampleArticles: Article[] = [
  {
    id: 'a1',
    slug: 'como-escolher-parafusadeira',
    title: 'Como escolher uma parafusadeira?',
    categorySlug: 'ferramentas-eletricas',
    articleType: 'guia',
    summary: 'Entenda torque, bateria e mandril.',
    content: 'Conteúdo completo sobre torque em Nm.',
    imageUrl: '/img/a1.jpg',
    keywords: ['parafusadeira', 'torque', '21v'],
    readMinutes: 6,
    relatedProductSlugs: ['parafusadeira-the-black-tools-tb-21px'],
    featured: true,
    status: 'published',
    createdAt: '2026-11-01T10:00:00Z',
    updatedAt: '2026-11-18T10:00:00Z',
  },
];

test('filterProducts excludes drafts by default and matches accents/case insensitively', () => {
  const allPublished = filterProducts(sampleProducts, {});
  assert.equal(allPublished.length, 3);

  const searchResult = filterProducts(sampleProducts, { query: 'esmerilhadeira bosch' });
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].model, 'GWS 700');

  const under300 = filterProducts(sampleProducts, { priceRange: 'under-300' });
  assert.equal(under300.length, 1);
  assert.equal(under300[0].id, 'p1');
});

test('toggleCompareSelection enforces same category and max 3 limit', () => {
  const step1 = toggleCompareSelection([], 'p1', sampleProducts);
  assert.deepEqual(step1.nextIds, ['p1']);
  assert.equal(step1.error, null);

  const crossCat = toggleCompareSelection(step1.nextIds, 'p3', sampleProducts);
  assert.deepEqual(crossCat.nextIds, ['p1']);
  assert.ok(crossCat.error?.includes('mesma categoria'));

  const sameCat = toggleCompareSelection(step1.nextIds, 'p2', sampleProducts);
  assert.deepEqual(sameCat.nextIds, ['p1', 'p2']);
  assert.equal(sameCat.error, null);

  const removeOne = toggleCompareSelection(sameCat.nextIds, 'p1', sampleProducts);
  assert.deepEqual(removeOne.nextIds, ['p2']);
});

test('buildComparisonRows formats verified prices and omits empty optional rows', () => {
  const rows = buildComparisonRows([sampleProducts[0], sampleProducts[1]], sampleCategories);
  const pressaoRow = rows.find((r) => r.key === 'pressao');
  assert.equal(pressaoRow, undefined);

  const priceRow = rows.find((r) => r.key === 'preco');
  assert.ok(priceRow);
  assert.match(priceRow.values[0], /289,00/);
  assert.equal(priceRow.values[1], 'Consultar na oferta');
});

test('affiliate url validation and spec fallback formatting', () => {
  assert.equal(isValidAffiliateUrl('https://mercadolivre.com.br/abc'), true);
  assert.equal(isValidAffiliateUrl('javascript:alert(1)'), false);
  assert.equal(isValidAffiliateUrl(''), false);
  assert.equal(formatSpecValue('  '), 'Não informado');
  assert.equal(formatBrlFromCents(null), null);
  assert.equal(getPrimaryAffiliateLink(sampleProducts[0])?.id, 'l1');
  assert.equal(filterArticles(sampleArticles, 'torque').length, 1);
});

test('subcategory filtering, smart-comparator subcategory lock, and hasDifferences detection', () => {
  const withSubcategories: Product[] = [
    { ...sampleProducts[0], id: 's1', subcategory: 'Serra mármore' },
    { ...sampleProducts[1], id: 's2', subcategory: 'Soprador térmico' },
    {
      ...sampleProducts[1],
      id: 's3',
      model: 'GDC 150',
      brand: 'Bosch',
      subcategory: 'Serra mármore',
      specs: { ...sampleProducts[1].specs, potencia: '1500 W' },
    },
  ];

  const filteredSub = filterProducts(withSubcategories, { subcategory: 'Serra mármore' });
  assert.equal(filteredSub.length, 2);

  const distinct = getDistinctFilterValues(withSubcategories, 'ferramentas-eletricas');
  assert.deepEqual(distinct.subcategories, ['Serra mármore', 'Soprador térmico']);

  const firstPick = toggleCompareSelection([], 's1', withSubcategories);
  assert.deepEqual(firstPick.nextIds, ['s1']);

  const crossSub = toggleCompareSelection(firstPick.nextIds, 's2', withSubcategories);
  assert.deepEqual(crossSub.nextIds, ['s1']);
  assert.ok(crossSub.error?.includes('mesmo tipo'));

  const sameSub = toggleCompareSelection(firstPick.nextIds, 's3', withSubcategories);
  assert.deepEqual(sameSub.nextIds, ['s1', 's3']);
  assert.equal(sameSub.error, null);

  const rows = buildComparisonRows([withSubcategories[0], withSubcategories[2]], sampleCategories);
  const categoryRow = rows.find((r) => r.key === 'category');
  const brandRow = rows.find((r) => r.key === 'brand');
  assert.equal(categoryRow?.hasDifferences, false);
  assert.equal(brandRow?.hasDifferences, true);
});
