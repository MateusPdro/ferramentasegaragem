import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const tempDbPath = path.join(os.tmpdir(), `fg-test-${Date.now()}.db`);
process.env.DATABASE_PATH = tempDbPath;

import {
  authenticateAdmin,
  closeDbForTests,
  deleteProductById,
  getAdminStats,
  getDb,
  listArticles,
  listCategories,
  listProducts,
  recordAffiliateClick,
  upsertProduct,
} from './db.ts';
import { SEED_ARTICLES, SEED_PRODUCTS } from './seedData.ts';
import { EXPANSION_PRODUCTS } from './expansionData.ts';

test('SQLite initializes with 4 categories, 54 verified products, and 38 articles (22 published + 16 drafts)', () => {
  const categories = listCategories();
  const publishedProducts = listProducts(false);
  const allProducts = listProducts(true);
  const publishedArticles = listArticles(false);
  const allArticles = listArticles(true);

  assert.equal(categories.length, 4);
  assert.equal(publishedProducts.length, 54);
  assert.equal(allProducts.length, 54);
  assert.equal(publishedArticles.length, 22);
  assert.equal(allArticles.length, 38);

  const drafts = allArticles.filter((a) => a.status === 'draft');
  assert.equal(drafts.length, 16);
  assert.ok(drafts.every((d) => d.articleType === 'comparativo'));

  // All 10 original products and 6 original articles remain intact
  for (const orig of SEED_PRODUCTS) {
    const found = allProducts.find((p) => p.id === orig.id);
    assert.ok(found, `Original product ${orig.id} must remain intact`);
    assert.equal(found.slug, orig.slug);
    assert.ok(found.subcategory && found.subcategory.length > 0);
  }
  for (const origArt of SEED_ARTICLES) {
    const found = allArticles.find((a) => a.id === origArt.id);
    assert.ok(found, `Original article ${origArt.id} must remain intact`);
  }

  // Every one of the 16 expansion subcategories has at least 3 models
  const subcategoryPairs = Array.from(
    new Map(
      EXPANSION_PRODUCTS.map((p) => [`${p.categorySlug}::${p.subcategory}`, { categorySlug: p.categorySlug, subcategory: p.subcategory }])
    ).values()
  );
  assert.equal(subcategoryPairs.length, 16);

  for (const target of subcategoryPairs) {
    const matching = publishedProducts.filter(
      (p) => p.categorySlug === target.categorySlug && p.subcategory === target.subcategory
    );
    assert.ok(
      matching.length >= 3,
      `Subcategory ${target.subcategory} should have >=3 models, got ${matching.length}`
    );
  }

  // Verify WAP WF 12K3.2 is accurately categorized under ferramentas-eletricas
  const wf = allProducts.find((p) => p.model === 'WF 12K3.2');
  assert.ok(wf);
  assert.equal(wf.categorySlug, 'ferramentas-eletricas');
});

test('Admin authentication verifies seeded credentials', () => {
  const valid = authenticateAdmin('admin@ferramentasegaragem.com.br', 'GaragemAdmin2026!');
  assert.ok(valid);
  const invalid = authenticateAdmin('admin@ferramentasegaragem.com.br', 'wrong-pass');
  assert.equal(invalid, null);
});

test('Product CRUD, affiliate link saving, click tracking, and deletion persist cleanly', () => {
  const created = upsertProduct({
    slug: 'torquimetro-teste-12',
    title: 'Análise Torquímetro Estalo 1/2"',
    name: 'Torquímetro de Estalo 1/2"',
    brand: 'Gedore',
    model: 'Dremometer 1/2"',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Jogo de chaves combinadas',
    toolType: 'Torquímetro',
    application: 'Aperto controlado de cabeçote e rodas',
    shortDescription: 'Torquímetro de estalo calibrado.',
    introduction: 'Introdução técnica.',
    imageUrl: '/src/assets/images/cat_hand_tools_1795185271926.jpg',
    specs: {
      marca: 'Gedore',
      modelo: 'Dremometer',
      categoria: 'Ferramentas manuais',
      capacidade: '40 a 200 Nm',
    },
    highlights: ['40–200 Nm'],
    featuresText: 'Calibrado de fábrica.',
    pros: ['Alta precisão'],
    cons: ['Uso técnico específico'],
    targetAudience: 'Oficinas mecânicas',
    comparisonNotes: '',
    faq: [],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/torquimetro-gedore',
    verifiedAt: '2026-11-20',
    featured: false,
    status: 'published',
    affiliateLinks: [
      {
        label: 'Oferta Mercado Livre',
        marketplace: 'Mercado Livre',
        url: 'https://mercadolivre.com.br/produto-teste',
        priceCents: 65000,
        priceUpdatedAt: '2026-11-20',
        isPrimary: true,
      },
    ],
  });

  assert.equal(created.affiliateLinks.length, 1);
  assert.equal(created.subcategory, 'Jogo de chaves combinadas');

  const click = recordAffiliateClick('torquimetro-teste-12');
  assert.ok(click);
  assert.equal(click.targetUrl, 'https://mercadolivre.com.br/produto-teste');

  const stats = getAdminStats();
  assert.equal(stats.totalAffiliateClicks, 1);
  assert.equal(stats.productsWithAffiliateLinks, 1);

  const deleted = deleteProductById(created.id);
  assert.equal(deleted, true);
});

test('Expansion migration preserves existing affiliate links and creates backup cleanly', () => {
  // Simulate adding custom affiliate link on existing product and re-running DB init/migration
  const existing = listProducts(true).find((p) => p.id === 'prod-tb-21px');
  assert.ok(existing);
  upsertProduct({
    ...existing,
    affiliateLinks: [
      {
        label: 'Link Preservado',
        marketplace: 'Mercado Livre',
        url: 'https://mercadolivre.com.br/preservado',
        priceCents: 29900,
        priceUpdatedAt: '2026-11-20',
        isPrimary: true,
      },
    ],
  });

  closeDbForTests();
  const db = getDb();
  assert.ok(db);

  const reloaded = listProducts(true).find((p) => p.id === 'prod-tb-21px');
  assert.ok(reloaded);
  assert.equal(reloaded.affiliateLinks.length, 1);
  assert.equal(reloaded.affiliateLinks[0].url, 'https://mercadolivre.com.br/preservado');

  closeDbForTests();
  for (const suffix of ['', '-wal', '-shm', '.pre-expansion.bak']) {
    if (fs.existsSync(`${tempDbPath}${suffix}`)) {
      fs.unlinkSync(`${tempDbPath}${suffix}`);
    }
  }
});
