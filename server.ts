import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import {
  clearSessionCookie,
  getSessionFromRequest,
  requireAdminAuth,
  setSessionCookie,
  signSessionToken,
} from './src/server/auth.ts';
import {
  authenticateAdmin,
  createContactMessage,
  deleteArticleById,
  deleteCategoryById,
  deleteProductById,
  getAdminStats,
  getArticleBySlug,
  getDb,
  getProductBySlug,
  listArticles,
  listCategories,
  listContactMessages,
  listProducts,
  recordAffiliateClick,
  upsertArticle,
  upsertCategory,
  upsertProduct,
} from './src/server/db.ts';
import { isValidAffiliateUrl, slugify } from './src/lib/catalog.ts';

async function createApp() {
  // Initialize SQLite & seed initial content before handling requests
  getDb();

  const app = express();
  app.use(express.json({ limit: '2mb' }));

  // --- SEO: robots.txt & dynamic sitemap.xml ---
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
    res.type('text/plain').send(
      [
        'User-agent: *',
        'Allow: /',
        'Disallow: /admin',
        'Disallow: /api/',
        `Sitemap: ${baseUrl}/sitemap.xml`,
      ].join('\n')
    );
  });

  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = (process.env.APP_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
    const categories = listCategories();
    const products = listProducts(false);
    const articles = listArticles(false);

    const staticRoutes = [
      '/',
      '/ferramentas',
      '/comparativos',
      '/guias',
      '/sobre',
      '/contato',
      '/privacidade',
      '/afiliados',
      '/termos',
    ];

    const urls: Array<{ loc: string; lastmod?: string; priority: string }> = [
      ...staticRoutes.map((route) => ({ loc: `${baseUrl}${route}`, priority: route === '/' ? '1.0' : '0.7' })),
      ...categories.map((c) => ({ loc: `${baseUrl}/categoria/${c.slug}`, priority: '0.8' })),
      ...products.map((p) => ({
        loc: `${baseUrl}/produto/${p.slug}`,
        lastmod: p.updatedAt.slice(0, 10),
        priority: '0.9',
      })),
      ...articles.map((a) => ({
        loc: `${baseUrl}/artigo/${a.slug}`,
        lastmod: a.updatedAt.slice(0, 10),
        priority: '0.8',
      })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.type('application/xml').send(xml);
  });

  // --- Affiliate Click Tracking & Redirect ---
  app.get('/go/:productSlug', (req, res) => {
    const productSlug = req.params.productSlug;
    const linkId = typeof req.query.linkId === 'string' ? req.query.linkId : undefined;
    const result = recordAffiliateClick(productSlug, linkId, req.get('user-agent'));

    if (!result || !isValidAffiliateUrl(result.targetUrl)) {
      res.redirect(`/produto/${encodeURIComponent(productSlug)}`);
      return;
    }

    res.redirect(302, result.targetUrl);
  });

  // --- Public Catalog & Content API ---
  app.get('/api/bootstrap', (_req, res) => {
    res.json({
      categories: listCategories(),
      products: listProducts(false),
      articles: listArticles(false),
    });
  });

  app.get('/api/categories', (_req, res) => {
    res.json(listCategories());
  });

  app.get('/api/products', (_req, res) => {
    res.json(listProducts(false));
  });

  app.get('/api/products/:slug', (req, res) => {
    const product = getProductBySlug(req.params.slug, false);
    if (!product) {
      res.status(404).json({ error: 'Produto não encontrado.' });
      return;
    }
    res.json(product);
  });

  app.get('/api/articles', (_req, res) => {
    res.json(listArticles(false));
  });

  app.get('/api/articles/:slug', (req, res) => {
    const article = getArticleBySlug(req.params.slug, false);
    if (!article) {
      res.status(404).json({ error: 'Artigo não encontrado.' });
      return;
    }
    res.json(article);
  });

  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body ?? {};
    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof email !== 'string' ||
      !email.includes('@') ||
      typeof subject !== 'string' ||
      !subject.trim() ||
      typeof message !== 'string' ||
      message.trim().length < 10
    ) {
      res.status(400).json({
        error: 'Preencha nome, e-mail válido, assunto e mensagem (mínimo 10 caracteres).',
      });
      return;
    }
    const saved = createContactMessage({ name, email, subject, message });
    res.status(201).json({ ok: true, id: saved.id });
  });

  // --- Admin Auth API ---
  app.get('/api/auth/me', (req, res) => {
    const session = getSessionFromRequest(req);
    if (!session) {
      res.json({ authenticated: false, user: null });
      return;
    }
    res.json({
      authenticated: true,
      user: { id: session.userId, email: session.email, name: session.name },
    });
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body ?? {};
    if (typeof email !== 'string' || typeof password !== 'string') {
      res.status(400).json({ error: 'Informe e-mail e senha.' });
      return;
    }
    const user = authenticateAdmin(email, password);
    if (!user) {
      res.status(401).json({ error: 'Credenciais inválidas.' });
      return;
    }
    const token = signSessionToken(user);
    setSessionCookie(res, token);
    res.json({ authenticated: true, user });
  });

  app.post('/api/auth/logout', (_req, res) => {
    clearSessionCookie(res);
    res.json({ ok: true });
  });

  // --- Protected Admin CMS API ---
  app.get('/api/admin/overview', requireAdminAuth, (_req, res) => {
    res.json({
      stats: getAdminStats(),
      categories: listCategories(),
      products: listProducts(true),
      articles: listArticles(true),
      messages: listContactMessages(),
    });
  });

  app.post('/api/admin/categories', requireAdminAuth, (req, res) => {
    const body = req.body ?? {};
    if (!body.name || typeof body.name !== 'string') {
      res.status(400).json({ error: 'Nome da categoria é obrigatório.' });
      return;
    }
    const slug = (typeof body.slug === 'string' && body.slug.trim()) || slugify(body.name);
    const saved = upsertCategory({
      id: typeof body.id === 'string' ? body.id : undefined,
      slug,
      name: body.name.trim(),
      shortName: (body.shortName || body.name).trim(),
      description: String(body.description || '').trim(),
      imageUrl: String(body.imageUrl || '/src/assets/images/cat_power_tools_1795185272335.jpg'),
      subtopics: Array.isArray(body.subtopics) ? body.subtopics.map(String) : [],
      displayOrder: Number(body.displayOrder ?? 10),
    });
    res.json(saved);
  });

  app.delete('/api/admin/categories/:id', requireAdminAuth, (req, res) => {
    const deleted = deleteCategoryById(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Categoria não encontrada.' });
      return;
    }
    res.json({ ok: true });
  });

  app.post('/api/admin/products', requireAdminAuth, (req, res) => {
    const body = req.body ?? {};
    if (!body.name || !body.brand || !body.categorySlug) {
      res.status(400).json({ error: 'Nome, marca e categoria são obrigatórios.' });
      return;
    }
    const slug = (typeof body.slug === 'string' && body.slug.trim()) || slugify(body.name);

    const affiliateLinks = Array.isArray(body.affiliateLinks)
      ? body.affiliateLinks.map((l: Record<string, unknown>, idx: number) => {
          const url = String(l.url ?? '').trim();
          if (url && !isValidAffiliateUrl(url)) {
            throw new Error(`URL de afiliado inválida na posição ${idx + 1}. Use http:// ou https://.`);
          }
          return {
            id: typeof l.id === 'string' ? l.id : undefined,
            label: String(l.label || 'Oferta Mercado Livre').trim(),
            marketplace: String(l.marketplace || 'Mercado Livre').trim(),
            url,
            priceCents:
              typeof l.priceCents === 'number' && Number.isFinite(l.priceCents) && l.priceCents > 0
                ? Math.round(l.priceCents)
                : null,
            priceUpdatedAt: l.priceUpdatedAt ? String(l.priceUpdatedAt) : null,
            isPrimary: Boolean(l.isPrimary ?? idx === 0),
          };
        })
      : undefined;

    const mlRefUrl = typeof body.mlReferenceUrl === 'string' ? body.mlReferenceUrl.trim() : '';
    if (mlRefUrl && !isValidAffiliateUrl(mlRefUrl)) {
      res.status(400).json({ error: 'URL de referência do Mercado Livre inválida.' });
      return;
    }

    try {
      const saved = upsertProduct({
        id: typeof body.id === 'string' ? body.id : undefined,
        slug,
        title: String(body.title || `Análise: ${body.name}`).trim(),
        name: String(body.name).trim(),
        brand: String(body.brand).trim(),
        model: String(body.model || body.name).trim(),
        categorySlug: String(body.categorySlug).trim(),
        subcategory: String(body.subcategory || body.toolType || '').trim(),
        toolType: String(body.toolType || 'Ferramenta').trim(),
        application: String(body.application || 'Uso geral').trim(),
        shortDescription: String(body.shortDescription || '').trim(),
        introduction: String(body.introduction || '').trim(),
        imageUrl: String(body.imageUrl || '/src/assets/images/cat_power_tools_1795185272335.jpg'),
        specs: body.specs && typeof body.specs === 'object' ? body.specs : {
          marca: String(body.brand),
          modelo: String(body.model || ''),
          categoria: String(body.categorySlug),
        },
        highlights: Array.isArray(body.highlights) ? body.highlights.map(String) : [],
        featuresText: String(body.featuresText || '').trim(),
        pros: Array.isArray(body.pros) ? body.pros.map(String) : [],
        cons: Array.isArray(body.cons) ? body.cons.map(String) : [],
        targetAudience: String(body.targetAudience || '').trim(),
        comparisonNotes: String(body.comparisonNotes || '').trim(),
        faq: Array.isArray(body.faq) ? body.faq : [],
        mlReferenceUrl: mlRefUrl || undefined,
        ratingInfo: typeof body.ratingInfo === 'string' ? body.ratingInfo.trim() : undefined,
        salesInfo: typeof body.salesInfo === 'string' ? body.salesInfo.trim() : undefined,
        verifiedAt: typeof body.verifiedAt === 'string' ? body.verifiedAt.trim() : undefined,
        featured: Boolean(body.featured),
        status: body.status === 'draft' ? 'draft' : 'published',
        affiliateLinks,
      });
      res.json(saved);
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : 'Erro ao salvar produto.' });
    }
  });

  app.delete('/api/admin/products/:id', requireAdminAuth, (req, res) => {
    const deleted = deleteProductById(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Produto não encontrado.' });
      return;
    }
    res.json({ ok: true });
  });

  app.post('/api/admin/articles', requireAdminAuth, (req, res) => {
    const body = req.body ?? {};
    if (!body.title || !body.categorySlug || !body.content) {
      res.status(400).json({ error: 'Título, categoria e conteúdo são obrigatórios.' });
      return;
    }
    const slug = (typeof body.slug === 'string' && body.slug.trim()) || slugify(body.title);
    const saved = upsertArticle({
      id: typeof body.id === 'string' ? body.id : undefined,
      slug,
      title: String(body.title).trim(),
      categorySlug: String(body.categorySlug).trim(),
      articleType: body.articleType === 'comparativo' ? 'comparativo' : 'guia',
      summary: String(body.summary || '').trim(),
      content: String(body.content).trim(),
      imageUrl: String(body.imageUrl || '/src/assets/images/editorial_tool_review_1795185271655.jpg'),
      keywords: Array.isArray(body.keywords) ? body.keywords.map(String) : [],
      readMinutes: Math.max(1, Number(body.readMinutes ?? 5)),
      relatedProductSlugs: Array.isArray(body.relatedProductSlugs) ? body.relatedProductSlugs.map(String) : [],
      featured: Boolean(body.featured),
      status: body.status === 'draft' ? 'draft' : 'published',
    });
    res.json(saved);
  });

  app.delete('/api/admin/articles/:id', requireAdminAuth, (req, res) => {
    const deleted = deleteArticleById(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Artigo não encontrado.' });
      return;
    }
    res.json({ ok: true });
  });

  // --- Frontend Serving (Vite Dev Middleware or Built Static Dist) ---
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const port = Number(process.env.PORT || 3000);
  app.listen(port, '0.0.0.0', () => {
    console.log(`Ferramentas & Garagem rodando na porta ${port}`);
  });
}

createApp().catch((err) => {
  console.error('Erro ao iniciar servidor:', err);
  process.exit(1);
});
