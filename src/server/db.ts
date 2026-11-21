import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import type {
  AdminStats,
  AdminUser,
  AffiliateLink,
  Article,
  Category,
  ContactMessage,
  Product,
  ProductFAQ,
  ProductSpecs,
  PublishStatus,
} from '../types/index.ts';
import { hashPassword, verifyPassword } from './auth.ts';
import {
  EXISTING_PRODUCT_SUBCATEGORIES,
  EXPANDED_CATEGORY_SUBTOPICS,
  EXPANSION_PRODUCTS,
} from './expansionData.ts';
import { EXPANSION_BUYING_GUIDES, EXPANSION_COMPARATIVE_DRAFTS } from './expansionArticles.ts';
import { SEED_ARTICLES, SEED_CATEGORIES, SEED_PRODUCTS } from './seedData.ts';

let dbInstance: DatabaseSync | null = null;
let loadedDbPath: string | null = null;

function getDbPath(): string {
  const configured = process.env.DATABASE_PATH || './data/ferramentas.db';
  return path.resolve(process.cwd(), configured);
}

export function closeDbForTests(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
    loadedDbPath = null;
  }
}

export function getDb(): DatabaseSync {
  const dbPath = getDbPath();
  if (dbInstance && loadedDbPath === dbPath) return dbInstance;
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const preExistingFile = fs.existsSync(dbPath);
  const db = new DatabaseSync(dbPath);
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');
  initSchema(db);

  if (preExistingFile && !hasColumn(db, 'products', 'subcategory')) {
    const backupPath = `${dbPath}.pre-expansion.bak`;
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(dbPath, backupPath);
    }
  }

  migrateSchema(db);
  seedDatabase(db);
  seedExpansion(db);
  dbInstance = db;
  loadedDbPath = dbPath;
  return db;
}

function hasColumn(db: DatabaseSync, table: string, column: string): boolean {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
  return cols.some((c) => c.name === column);
}

function initSchema(db: DatabaseSync): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      short_name TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT NOT NULL,
      subtopics_json TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      category_slug TEXT NOT NULL,
      subcategory TEXT NOT NULL DEFAULT '',
      tool_type TEXT NOT NULL,
      application TEXT NOT NULL,
      short_description TEXT NOT NULL,
      introduction TEXT NOT NULL,
      image_url TEXT NOT NULL,
      specs_json TEXT NOT NULL,
      highlights_json TEXT NOT NULL,
      features_text TEXT NOT NULL,
      pros_json TEXT NOT NULL,
      cons_json TEXT NOT NULL,
      target_audience TEXT NOT NULL,
      comparison_notes TEXT NOT NULL,
      faq_json TEXT NOT NULL,
      ml_reference_url TEXT NOT NULL DEFAULT '',
      rating_info TEXT NOT NULL DEFAULT '',
      sales_info TEXT NOT NULL DEFAULT '',
      verified_at TEXT NOT NULL DEFAULT '',
      featured INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'published',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS affiliate_links (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      label TEXT NOT NULL,
      marketplace TEXT NOT NULL DEFAULT 'Mercado Livre',
      url TEXT NOT NULL,
      price_cents INTEGER,
      price_updated_at TEXT,
      is_primary INTEGER NOT NULL DEFAULT 1,
      clicks_count INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS affiliate_clicks (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      link_id TEXT NOT NULL,
      clicked_at TEXT NOT NULL,
      user_agent TEXT,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      FOREIGN KEY (link_id) REFERENCES affiliate_links(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category_slug TEXT NOT NULL,
      article_type TEXT NOT NULL DEFAULT 'guia',
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      image_url TEXT NOT NULL,
      keywords_json TEXT NOT NULL,
      read_minutes INTEGER NOT NULL DEFAULT 5,
      related_product_slugs_json TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'published',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}

function seedDatabase(db: DatabaseSync): void {
  const now = new Date().toISOString();

  // Seed admin user if none exists
  const adminCountRow = db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number };
  if (adminCountRow.count === 0) {
    const email = process.env.ADMIN_EMAIL || 'admin@ferramentasegaragem.com.br';
    const password = process.env.ADMIN_PASSWORD || 'GaragemAdmin2026!';
    db.prepare(
      'INSERT INTO admin_users (id, email, name, password_hash, created_at) VALUES (?, ?, ?, ?, ?)'
    ).run('admin-1', email, 'Editor Ferramentas & Garagem', hashPassword(password), now);
  }

  // Seed categories if empty
  const catCountRow = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number };
  if (catCountRow.count === 0) {
    const insertCat = db.prepare(`
      INSERT INTO categories (id, slug, name, short_name, description, image_url, subtopics_json, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const c of SEED_CATEGORIES) {
      insertCat.run(
        c.id,
        c.slug,
        c.name,
        c.shortName,
        c.description,
        c.imageUrl,
        JSON.stringify(c.subtopics),
        c.displayOrder
      );
    }
  }

  // Seed products if empty
  const prodCountRow = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
  if (prodCountRow.count === 0) {
    const insertProd = db.prepare(`
      INSERT INTO products (
        id, slug, title, name, brand, model, category_slug, tool_type, application,
        short_description, introduction, image_url, specs_json, highlights_json,
        features_text, pros_json, cons_json, target_audience, comparison_notes,
        faq_json, featured, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const p of SEED_PRODUCTS) {
      insertProd.run(
        p.id,
        p.slug,
        p.title,
        p.name,
        p.brand,
        p.model,
        p.categorySlug,
        p.toolType,
        p.application,
        p.shortDescription,
        p.introduction,
        p.imageUrl,
        JSON.stringify(p.specs),
        JSON.stringify(p.highlights),
        p.featuresText,
        JSON.stringify(p.pros),
        JSON.stringify(p.cons),
        p.targetAudience,
        p.comparisonNotes,
        JSON.stringify(p.faq),
        p.featured ? 1 : 0,
        p.status,
        now,
        now
      );
    }
  }

  // Seed articles if empty
  const artCountRow = db.prepare('SELECT COUNT(*) as count FROM articles').get() as { count: number };
  if (artCountRow.count === 0) {
    const insertArt = db.prepare(`
      INSERT INTO articles (
        id, slug, title, category_slug, article_type, summary, content, image_url,
        keywords_json, read_minutes, related_product_slugs_json, featured, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const a of SEED_ARTICLES) {
      insertArt.run(
        a.id,
        a.slug,
        a.title,
        a.categorySlug,
        a.articleType,
        a.summary,
        a.content,
        a.imageUrl,
        JSON.stringify(a.keywords),
        a.readMinutes,
        JSON.stringify(a.relatedProductSlugs),
        a.featured ? 1 : 0,
        a.status,
        now,
        now
      );
    }
  }
}

function migrateSchema(db: DatabaseSync): void {
  const migrations: Array<[string, string]> = [
    ['subcategory', "ALTER TABLE products ADD COLUMN subcategory TEXT NOT NULL DEFAULT ''"],
    ['ml_reference_url', "ALTER TABLE products ADD COLUMN ml_reference_url TEXT NOT NULL DEFAULT ''"],
    ['rating_info', "ALTER TABLE products ADD COLUMN rating_info TEXT NOT NULL DEFAULT ''"],
    ['sales_info', "ALTER TABLE products ADD COLUMN sales_info TEXT NOT NULL DEFAULT ''"],
    ['verified_at', "ALTER TABLE products ADD COLUMN verified_at TEXT NOT NULL DEFAULT ''"],
  ];

  for (const [col, ddl] of migrations) {
    if (!hasColumn(db, 'products', col)) {
      db.exec(ddl);
    }
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL
    );
  `);
}

function seedExpansion(db: DatabaseSync): void {
  const migrationKey = 'catalog_expansion_v1_48_models';
  const alreadyApplied = db
    .prepare('SELECT name FROM schema_migrations WHERE name = ?')
    .get(migrationKey) as { name: string } | undefined;

  if (alreadyApplied) {
    return;
  }

  const now = new Date().toISOString();

  db.exec('BEGIN');
  try {
    // 1. Backfill subcategory on the 10 preserved original products without touching specs, slugs, or affiliate links
    const updateOriginalSubcat = db.prepare(
      "UPDATE products SET subcategory = ? WHERE id = ? AND trim(COALESCE(subcategory, '')) = ''"
    );
    for (const [prodId, subcat] of Object.entries(EXISTING_PRODUCT_SUBCATEGORIES)) {
      updateOriginalSubcat.run(subcat, prodId);
    }

    // 2. Merge new subcategories into the 4 main categories without deleting custom entries
    const selectCat = db.prepare('SELECT id, subtopics_json FROM categories WHERE slug = ?');
    const updateCat = db.prepare('UPDATE categories SET subtopics_json = ? WHERE id = ?');
    for (const [catSlug, expandedTopics] of Object.entries(EXPANDED_CATEGORY_SUBTOPICS)) {
      const catRow = selectCat.get(catSlug) as { id: string; subtopics_json: string } | undefined;
      if (catRow) {
        const currentTopics = safeJson<string[]>(catRow.subtopics_json, []);
        const merged = Array.from(new Set([...expandedTopics, ...currentTopics]));
        updateCat.run(JSON.stringify(merged), catRow.id);
      }
    }

    // 3. Insert net-new expansion products safely (preserve any existing ID or slug)
    const existsProd = db.prepare('SELECT id FROM products WHERE id = ? OR slug = ?');
    const insertProd = db.prepare(`
      INSERT INTO products (
        id, slug, title, name, brand, model, category_slug, subcategory, tool_type, application,
        short_description, introduction, image_url, specs_json, highlights_json,
        features_text, pros_json, cons_json, target_audience, comparison_notes,
        faq_json, ml_reference_url, rating_info, sales_info, verified_at,
        featured, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of EXPANSION_PRODUCTS) {
      if (existsProd.get(p.id, p.slug)) continue;
      insertProd.run(
        p.id,
        p.slug,
        p.title,
        p.name,
        p.brand,
        p.model,
        p.categorySlug,
        p.subcategory,
        p.toolType,
        p.application,
        p.shortDescription,
        p.introduction,
        p.imageUrl,
        JSON.stringify(p.specs),
        JSON.stringify(p.highlights),
        p.featuresText,
        JSON.stringify(p.pros),
        JSON.stringify(p.cons),
        p.targetAudience,
        p.comparisonNotes,
        JSON.stringify(p.faq),
        p.mlReferenceUrl,
        p.ratingInfo ?? '',
        p.salesInfo ?? '',
        p.verifiedAt,
        p.featured ? 1 : 0,
        p.status,
        now,
        now
      );
    }

    // 4. Insert the 16 comparative drafts + 16 published buying guides
    const existsArt = db.prepare('SELECT id FROM articles WHERE id = ? OR slug = ?');
    const insertArt = db.prepare(`
      INSERT INTO articles (
        id, slug, title, category_slug, article_type, summary, content, image_url,
        keywords_json, read_minutes, related_product_slugs_json, featured, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const a of [...EXPANSION_COMPARATIVE_DRAFTS, ...EXPANSION_BUYING_GUIDES]) {
      if (existsArt.get(a.id, a.slug)) continue;
      insertArt.run(
        a.id,
        a.slug,
        a.title,
        a.categorySlug,
        a.articleType,
        a.summary,
        a.content,
        a.imageUrl,
        JSON.stringify(a.keywords),
        a.readMinutes,
        JSON.stringify(a.relatedProductSlugs),
        a.featured ? 1 : 0,
        a.status,
        now,
        now
      );
    }

    db.prepare('INSERT INTO schema_migrations (name, applied_at) VALUES (?, ?)').run(migrationKey, now);
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

function safeJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function authenticateAdmin(email: string, password: string): AdminUser | null {
  const db = getDb();
  const row = db
    .prepare('SELECT id, email, name, password_hash FROM admin_users WHERE lower(email) = lower(?)')
    .get(email.trim()) as { id: string; email: string; name: string; password_hash: string } | undefined;

  if (!row) return null;
  if (!verifyPassword(password, row.password_hash)) return null;
  return { id: row.id, email: row.email, name: row.name };
}

export function listCategories(): Category[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM categories ORDER BY display_order ASC, name ASC').all() as Array<
    Record<string, unknown>
  >;
  return rows.map((r) => ({
    id: String(r.id),
    slug: String(r.slug),
    name: String(r.name),
    shortName: String(r.short_name),
    description: String(r.description),
    imageUrl: String(r.image_url),
    subtopics: safeJson<string[]>(String(r.subtopics_json), []),
    displayOrder: Number(r.display_order ?? 0),
  }));
}

export function upsertCategory(input: Omit<Category, 'id'> & { id?: string }): Category {
  const db = getDb();
  const id = input.id || `cat-${Date.now()}`;
  const existing = db.prepare('SELECT id FROM categories WHERE id = ?').get(id);
  if (existing) {
    db.prepare(
      `UPDATE categories SET slug = ?, name = ?, short_name = ?, description = ?, image_url = ?, subtopics_json = ?, display_order = ? WHERE id = ?`
    ).run(
      input.slug,
      input.name,
      input.shortName,
      input.description,
      input.imageUrl,
      JSON.stringify(input.subtopics),
      input.displayOrder,
      id
    );
  } else {
    db.prepare(
      `INSERT INTO categories (id, slug, name, short_name, description, image_url, subtopics_json, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      input.slug,
      input.name,
      input.shortName,
      input.description,
      input.imageUrl,
      JSON.stringify(input.subtopics),
      input.displayOrder
    );
  }
  return { ...input, id };
}

export function deleteCategoryById(id: string): boolean {
  const db = getDb();
  const res = db.prepare('DELETE FROM categories WHERE id = ?').run(id);
  return res.changes > 0;
}

function mapLinksForProduct(db: DatabaseSync, productId: string): AffiliateLink[] {
  const rows = db
    .prepare('SELECT * FROM affiliate_links WHERE product_id = ? ORDER BY is_primary DESC, label ASC')
    .all(productId) as Array<Record<string, unknown>>;
  return rows.map((l) => ({
    id: String(l.id),
    productId: String(l.product_id),
    label: String(l.label),
    marketplace: String(l.marketplace),
    url: String(l.url),
    priceCents: l.price_cents === null || l.price_cents === undefined ? null : Number(l.price_cents),
    priceUpdatedAt: l.price_updated_at ? String(l.price_updated_at) : null,
    isPrimary: Boolean(l.is_primary),
    clicksCount: Number(l.clicks_count ?? 0),
  }));
}

function mapProductRow(db: DatabaseSync, r: Record<string, unknown>): Product {
  const id = String(r.id);
  const subcat = r.subcategory ? String(r.subcategory) : '';
  return {
    id,
    slug: String(r.slug),
    title: String(r.title),
    name: String(r.name),
    brand: String(r.brand),
    model: String(r.model),
    categorySlug: String(r.category_slug),
    subcategory: subcat || String(r.tool_type),
    toolType: String(r.tool_type),
    application: String(r.application),
    shortDescription: String(r.short_description),
    introduction: String(r.introduction),
    imageUrl: String(r.image_url),
    specs: safeJson<ProductSpecs>(String(r.specs_json), {
      marca: String(r.brand),
      modelo: String(r.model),
      categoria: String(r.category_slug),
    }),
    highlights: safeJson<string[]>(String(r.highlights_json), []),
    featuresText: String(r.features_text),
    pros: safeJson<string[]>(String(r.pros_json), []),
    cons: safeJson<string[]>(String(r.cons_json), []),
    targetAudience: String(r.target_audience),
    comparisonNotes: String(r.comparison_notes),
    faq: safeJson<ProductFAQ[]>(String(r.faq_json), []),
    mlReferenceUrl: r.ml_reference_url ? String(r.ml_reference_url) : undefined,
    ratingInfo: r.rating_info ? String(r.rating_info) : undefined,
    salesInfo: r.sales_info ? String(r.sales_info) : undefined,
    verifiedAt: r.verified_at ? String(r.verified_at) : undefined,
    featured: Boolean(r.featured),
    status: (String(r.status) === 'draft' ? 'draft' : 'published') as PublishStatus,
    affiliateLinks: mapLinksForProduct(db, id),
    createdAt: String(r.created_at),
    updatedAt: String(r.updated_at),
  };
}

export function listProducts(includeDrafts = false): Product[] {
  const db = getDb();
  const sql = includeDrafts
    ? 'SELECT * FROM products ORDER BY featured DESC, updated_at DESC'
    : "SELECT * FROM products WHERE status = 'published' ORDER BY featured DESC, updated_at DESC";
  const rows = db.prepare(sql).all() as Array<Record<string, unknown>>;
  return rows.map((r) => mapProductRow(db, r));
}

export function getProductBySlug(slug: string, includeDrafts = false): Product | null {
  const db = getDb();
  const sql = includeDrafts
    ? 'SELECT * FROM products WHERE slug = ?'
    : "SELECT * FROM products WHERE slug = ? AND status = 'published'";
  const row = db.prepare(sql).get(slug) as Record<string, unknown> | undefined;
  return row ? mapProductRow(db, row) : null;
}

export interface ProductUpsertInput {
  id?: string;
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
  affiliateLinks?: Array<{
    id?: string;
    label: string;
    marketplace: string;
    url: string;
    priceCents: number | null;
    priceUpdatedAt: string | null;
    isPrimary: boolean;
  }>;
}

export function upsertProduct(input: ProductUpsertInput): Product {
  const db = getDb();
  const now = new Date().toISOString();
  const id = input.id || `prod-${Date.now()}`;
  const subcategory = (input.subcategory || input.toolType || '').trim();
  const existing = db.prepare('SELECT id, created_at FROM products WHERE id = ?').get(id) as
    | { id: string; created_at: string }
    | undefined;

  if (existing) {
    db.prepare(`
      UPDATE products SET
        slug = ?, title = ?, name = ?, brand = ?, model = ?, category_slug = ?,
        subcategory = ?, tool_type = ?, application = ?, short_description = ?, introduction = ?,
        image_url = ?, specs_json = ?, highlights_json = ?, features_text = ?,
        pros_json = ?, cons_json = ?, target_audience = ?, comparison_notes = ?,
        faq_json = ?, ml_reference_url = ?, rating_info = ?, sales_info = ?, verified_at = ?,
        featured = ?, status = ?, updated_at = ?
      WHERE id = ?
    `).run(
      input.slug,
      input.title,
      input.name,
      input.brand,
      input.model,
      input.categorySlug,
      subcategory,
      input.toolType,
      input.application,
      input.shortDescription,
      input.introduction,
      input.imageUrl,
      JSON.stringify(input.specs),
      JSON.stringify(input.highlights),
      input.featuresText,
      JSON.stringify(input.pros),
      JSON.stringify(input.cons),
      input.targetAudience,
      input.comparisonNotes,
      JSON.stringify(input.faq),
      input.mlReferenceUrl ?? '',
      input.ratingInfo ?? '',
      input.salesInfo ?? '',
      input.verifiedAt ?? '',
      input.featured ? 1 : 0,
      input.status,
      now,
      id
    );
  } else {
    db.prepare(`
      INSERT INTO products (
        id, slug, title, name, brand, model, category_slug, subcategory, tool_type, application,
        short_description, introduction, image_url, specs_json, highlights_json,
        features_text, pros_json, cons_json, target_audience, comparison_notes,
        faq_json, ml_reference_url, rating_info, sales_info, verified_at,
        featured, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      input.slug,
      input.title,
      input.name,
      input.brand,
      input.model,
      input.categorySlug,
      subcategory,
      input.toolType,
      input.application,
      input.shortDescription,
      input.introduction,
      input.imageUrl,
      JSON.stringify(input.specs),
      JSON.stringify(input.highlights),
      input.featuresText,
      JSON.stringify(input.pros),
      JSON.stringify(input.cons),
      input.targetAudience,
      input.comparisonNotes,
      JSON.stringify(input.faq),
      input.mlReferenceUrl ?? '',
      input.ratingInfo ?? '',
      input.salesInfo ?? '',
      input.verifiedAt ?? '',
      input.featured ? 1 : 0,
      input.status,
      now,
      now
    );
  }

  if (Array.isArray(input.affiliateLinks)) {
    // Preserve click counts for matching link IDs
    const prevClicks = new Map<string, number>();
    const oldRows = db.prepare('SELECT id, clicks_count FROM affiliate_links WHERE product_id = ?').all(id) as Array<{
      id: string;
      clicks_count: number;
    }>;
    for (const r of oldRows) {
      prevClicks.set(r.id, r.clicks_count);
    }

    db.prepare('DELETE FROM affiliate_links WHERE product_id = ?').run(id);
    const insertLink = db.prepare(`
      INSERT INTO affiliate_links (id, product_id, label, marketplace, url, price_cents, price_updated_at, is_primary, clicks_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    input.affiliateLinks.forEach((link, idx) => {
      const linkId = link.id || `link-${Date.now()}-${idx}`;
      const clicks = prevClicks.get(linkId) ?? 0;
      insertLink.run(
        linkId,
        id,
        link.label || 'Oferta Mercado Livre',
        link.marketplace || 'Mercado Livre',
        link.url.trim(),
        link.priceCents ?? null,
        link.priceUpdatedAt ?? null,
        link.isPrimary ? 1 : 0,
        clicks
      );
    });
  }

  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as Record<string, unknown>;
  return mapProductRow(db, row);
}

export function deleteProductById(id: string): boolean {
  const db = getDb();
  const res = db.prepare('DELETE FROM products WHERE id = ?').run(id);
  return res.changes > 0;
}

export function recordAffiliateClick(
  productSlug: string,
  linkId?: string,
  userAgent?: string
): { targetUrl: string; linkId: string } | null {
  const db = getDb();
  const prod = db.prepare('SELECT id FROM products WHERE slug = ?').get(productSlug) as { id: string } | undefined;
  if (!prod) return null;

  const linkRow = (
    linkId
      ? db.prepare('SELECT id, url FROM affiliate_links WHERE id = ? AND product_id = ?').get(linkId, prod.id)
      : db
          .prepare(
            "SELECT id, url FROM affiliate_links WHERE product_id = ? AND trim(url) != '' ORDER BY is_primary DESC LIMIT 1"
          )
          .get(prod.id)
  ) as { id: string; url: string } | undefined;

  if (!linkRow || !linkRow.url.trim()) return null;

  const now = new Date().toISOString();
  db.prepare('UPDATE affiliate_links SET clicks_count = clicks_count + 1 WHERE id = ?').run(linkRow.id);
  db.prepare('INSERT INTO affiliate_clicks (id, product_id, link_id, clicked_at, user_agent) VALUES (?, ?, ?, ?, ?)').run(
    `clk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    prod.id,
    linkRow.id,
    now,
    userAgent ?? null
  );

  return { targetUrl: linkRow.url.trim(), linkId: linkRow.id };
}

function mapArticleRow(r: Record<string, unknown>): Article {
  return {
    id: String(r.id),
    slug: String(r.slug),
    title: String(r.title),
    categorySlug: String(r.category_slug),
    articleType: String(r.article_type) === 'comparativo' ? 'comparativo' : 'guia',
    summary: String(r.summary),
    content: String(r.content),
    imageUrl: String(r.image_url),
    keywords: safeJson<string[]>(String(r.keywords_json), []),
    readMinutes: Number(r.read_minutes ?? 5),
    relatedProductSlugs: safeJson<string[]>(String(r.related_product_slugs_json), []),
    featured: Boolean(r.featured),
    status: (String(r.status) === 'draft' ? 'draft' : 'published') as PublishStatus,
    createdAt: String(r.created_at),
    updatedAt: String(r.updated_at),
  };
}

export function listArticles(includeDrafts = false): Article[] {
  const db = getDb();
  const sql = includeDrafts
    ? 'SELECT * FROM articles ORDER BY featured DESC, updated_at DESC'
    : "SELECT * FROM articles WHERE status = 'published' ORDER BY featured DESC, updated_at DESC";
  const rows = db.prepare(sql).all() as Array<Record<string, unknown>>;
  return rows.map(mapArticleRow);
}

export function getArticleBySlug(slug: string, includeDrafts = false): Article | null {
  const db = getDb();
  const sql = includeDrafts
    ? 'SELECT * FROM articles WHERE slug = ?'
    : "SELECT * FROM articles WHERE slug = ? AND status = 'published'";
  const row = db.prepare(sql).get(slug) as Record<string, unknown> | undefined;
  return row ? mapArticleRow(row) : null;
}

export function upsertArticle(
  input: Omit<Article, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
): Article {
  const db = getDb();
  const now = new Date().toISOString();
  const id = input.id || `art-${Date.now()}`;
  const existing = db.prepare('SELECT id FROM articles WHERE id = ?').get(id);

  if (existing) {
    db.prepare(`
      UPDATE articles SET
        slug = ?, title = ?, category_slug = ?, article_type = ?, summary = ?,
        content = ?, image_url = ?, keywords_json = ?, read_minutes = ?,
        related_product_slugs_json = ?, featured = ?, status = ?, updated_at = ?
      WHERE id = ?
    `).run(
      input.slug,
      input.title,
      input.categorySlug,
      input.articleType,
      input.summary,
      input.content,
      input.imageUrl,
      JSON.stringify(input.keywords),
      input.readMinutes,
      JSON.stringify(input.relatedProductSlugs),
      input.featured ? 1 : 0,
      input.status,
      now,
      id
    );
  } else {
    db.prepare(`
      INSERT INTO articles (
        id, slug, title, category_slug, article_type, summary, content, image_url,
        keywords_json, read_minutes, related_product_slugs_json, featured, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      input.slug,
      input.title,
      input.categorySlug,
      input.articleType,
      input.summary,
      input.content,
      input.imageUrl,
      JSON.stringify(input.keywords),
      input.readMinutes,
      JSON.stringify(input.relatedProductSlugs),
      input.featured ? 1 : 0,
      input.status,
      now,
      now
    );
  }

  const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(id) as Record<string, unknown>;
  return mapArticleRow(row);
}

export function deleteArticleById(id: string): boolean {
  const db = getDb();
  const res = db.prepare('DELETE FROM articles WHERE id = ?').run(id);
  return res.changes > 0;
}

export function createContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ContactMessage {
  const db = getDb();
  const id = `msg-${Date.now()}`;
  const createdAt = new Date().toISOString();
  db.prepare('INSERT INTO contact_messages (id, name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?, ?)').run(
    id,
    input.name.trim(),
    input.email.trim(),
    input.subject.trim(),
    input.message.trim(),
    createdAt
  );
  return { id, ...input, createdAt };
}

export function listContactMessages(): ContactMessage[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 50').all() as Array<
    Record<string, unknown>
  >;
  return rows.map((r) => ({
    id: String(r.id),
    name: String(r.name),
    email: String(r.email),
    subject: String(r.subject),
    message: String(r.message),
    createdAt: String(r.created_at),
  }));
}

export function getAdminStats(): AdminStats {
  const db = getDb();
  const prodStats = db
    .prepare(
      `SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft
      FROM products`
    )
    .get() as { total: number; published: number; draft: number };

  const artStats = db
    .prepare(
      `SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft
      FROM articles`
    )
    .get() as { total: number; published: number; draft: number };

  const catCount = (db.prepare('SELECT COUNT(*) as total FROM categories').get() as { total: number }).total;
  const totalClicks = (
    db.prepare('SELECT COALESCE(SUM(clicks_count), 0) as total FROM affiliate_links').get() as { total: number }
  ).total;
  const productsWithLinks = (
    db
      .prepare("SELECT COUNT(DISTINCT product_id) as total FROM affiliate_links WHERE trim(url) != ''")
      .get() as { total: number }
  ).total;

  const recentClickRows = db
    .prepare(
      `SELECT c.id, c.clicked_at, p.name as product_name, p.slug as product_slug, l.label as link_label
       FROM affiliate_clicks c
       JOIN products p ON p.id = c.product_id
       JOIN affiliate_links l ON l.id = c.link_id
       ORDER BY c.clicked_at DESC
       LIMIT 15`
    )
    .all() as Array<Record<string, unknown>>;

  return {
    totalProducts: Number(prodStats.total ?? 0),
    publishedProducts: Number(prodStats.published ?? 0),
    draftProducts: Number(prodStats.draft ?? 0),
    totalArticles: Number(artStats.total ?? 0),
    publishedArticles: Number(artStats.published ?? 0),
    draftArticles: Number(artStats.draft ?? 0),
    totalCategories: Number(catCount ?? 0),
    totalAffiliateClicks: Number(totalClicks ?? 0),
    productsWithAffiliateLinks: Number(productsWithLinks ?? 0),
    recentClicks: recentClickRows.map((r) => ({
      id: String(r.id),
      productName: String(r.product_name),
      productSlug: String(r.product_slug),
      linkLabel: String(r.link_label),
      clickedAt: String(r.clicked_at),
    })),
  };
}
