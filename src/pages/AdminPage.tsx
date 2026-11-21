import React, { useCallback, useEffect, useState } from 'react';
import {
  ExternalLink,
  FileText,
  FolderTree,
  Link2,
  Lock,
  LogOut,
  Mail,
  Package,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import { ArticleFormModal } from '../components/admin/ArticleFormModal';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import { usePortal } from '../context/PortalContext';
import { formatBrlFromCents, getPrimaryAffiliateLink, isValidAffiliateUrl, slugify } from '../lib/catalog';
import { applyPageSeo } from '../lib/seo';
import type { AdminStats, Article, Category, ContactMessage, Product } from '../types/index';

type AdminTab = 'dashboard' | 'products' | 'articles' | 'categories' | 'messages';

export function AdminPage() {
  const { adminUser, setAdminUser, refreshCatalog, navigate } = usePortal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [loadingOverview, setLoadingOverview] = useState(false);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);
  const [adminArticles, setAdminArticles] = useState<Article[]>([]);
  const [adminCategories, setAdminCategories] = useState<Category[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const [editingProduct, setEditingProduct] = useState<Product | null | undefined>(undefined);
  const [editingArticle, setEditingArticle] = useState<Article | null | undefined>(undefined);
  const [prodFilterCat, setProdFilterCat] = useState('all');
  const [prodFilterStatus, setProdFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [prodFilterQuery, setProdFilterQuery] = useState('');
  const [artFilterType, setArtFilterType] = useState<'all' | 'guia' | 'comparativo'>('all');
  const [artFilterStatus, setArtFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [artFilterQuery, setArtFilterQuery] = useState('');

  // Category quick form
  const [catFormOpen, setCatFormOpen] = useState(false);
  const [catId, setCatId] = useState<string | undefined>(undefined);
  const [catName, setCatName] = useState('');
  const [catShortName, setCatShortName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catImageUrl, setCatImageUrl] = useState('/src/assets/images/cat_power_tools_1795185272335.jpg');
  const [catSubtopics, setCatSubtopics] = useState('');
  const [catOrder, setCatOrder] = useState(5);

  useEffect(() => {
    applyPageSeo({
      title: 'Painel Administrativo',
      description: 'Gerenciamento editorial de produtos, artigos, categorias e links de afiliados.',
      path: '/admin',
    });
  }, []);

  const loadOverview = useCallback(async () => {
    setLoadingOverview(true);
    try {
      const res = await fetch('/api/admin/overview');
      if (res.status === 401) {
        setAdminUser(null);
        return;
      }
      if (!res.ok) return;
      const data = (await res.json()) as {
        stats: AdminStats;
        categories: Category[];
        products: Product[];
        articles: Article[];
        messages: ContactMessage[];
      };
      setStats(data.stats);
      setAdminCategories(data.categories);
      setAdminProducts(data.products);
      setAdminArticles(data.articles);
      setMessages(data.messages);
    } finally {
      setLoadingOverview(false);
    }
  }, [setAdminUser]);

  useEffect(() => {
    if (adminUser) {
      void loadOverview();
    }
  }, [adminUser, loadOverview]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { authenticated?: boolean; user?: { id: string; email: string; name: string }; error?: string };
      if (!res.ok || !data.user) {
        throw new Error(data.error || 'Falha na autenticação.');
      }
      setAdminUser(data.user);
      setPassword('');
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Erro ao entrar.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setAdminUser(null);
  };

  const handleDataChanged = async () => {
    await Promise.all([loadOverview(), refreshCatalog()]);
  };

  const handleDeleteProduct = async (prod: Product) => {
    const res = await fetch(`/api/admin/products/${prod.id}`, { method: 'DELETE' });
    if (res.ok) await handleDataChanged();
  };

  const handleDeleteArticle = async (art: Article) => {
    const res = await fetch(`/api/admin/articles/${art.id}`, { method: 'DELETE' });
    if (res.ok) await handleDataChanged();
  };

  const handleDeleteCategory = async (cat: Category) => {
    const res = await fetch(`/api/admin/categories/${cat.id}`, { method: 'DELETE' });
    if (res.ok) await handleDataChanged();
  };

  const openCategoryForm = (cat?: Category) => {
    setCatId(cat?.id);
    setCatName(cat?.name ?? '');
    setCatShortName(cat?.shortName ?? '');
    setCatSlug(cat?.slug ?? '');
    setCatDescription(cat?.description ?? '');
    setCatImageUrl(cat?.imageUrl ?? '/src/assets/images/cat_power_tools_1795185272335.jpg');
    setCatSubtopics((cat?.subtopics ?? []).join(', '));
    setCatOrder(cat?.displayOrder ?? adminCategories.length + 1);
    setCatFormOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: catId,
        name: catName,
        shortName: catShortName || catName,
        slug: catSlug || slugify(catName),
        description: catDescription,
        imageUrl: catImageUrl,
        subtopics: catSubtopics.split(',').map((s) => s.trim()).filter(Boolean),
        displayOrder: Number(catOrder),
      }),
    });
    if (res.ok) {
      setCatFormOpen(false);
      await handleDataChanged();
    }
  };

  if (!adminUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white border border-black/15 rounded-lg p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-[#17191C] text-[#F47721]">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="font-display text-2xl font-bold text-[#17191C]">
              Acesso Administrativo
            </h1>
            <p className="text-xs text-[#4A4F55] leading-relaxed">
              Área restrita para gerenciar produtos, artigos, categorias e links de afiliados do
              Mercado Livre. As credenciais são configuradas via ambiente de servidor (ver{' '}
              <code>README.md</code>).
            </p>
          </div>

          {authError && (
            <div role="alert" className="p-3 rounded bg-red-50 border border-red-200 text-xs text-red-900">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold text-[#17191C] mb-1">
                E-mail administrativo
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ferramentasegaragem.com.br"
                className="w-full border border-black/15 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-[#17191C] mb-1">
                Senha
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-2.5 rounded-md bg-[#F47721] hover:bg-[#FF9147] text-[#17191C] text-sm font-bold transition-colors disabled:opacity-60"
            >
              {loggingIn ? 'Autenticando...' : 'Entrar no painel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Admin Header */}
      <div className="bg-[#17191C] text-white rounded-lg p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-[#FF9147] font-medium">
            Painel Editorial · {adminUser.email}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            Gerenciamento Ferramentas &amp; Garagem
          </h1>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#F47721] hover:bg-[#FF9147] text-[#17191C] text-xs font-bold whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo produto</span>
          </button>
          <button
            type="button"
            onClick={() => setEditingArticle(null)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#202328] hover:bg-white/10 border border-white/15 text-white text-xs font-semibold whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo artigo</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Sair do painel administrativo"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-white/15 text-[#A9ADB2] hover:text-white text-xs font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 p-1 bg-white border border-black/10 rounded-lg mb-6">
        {(
          [
            { id: 'dashboard', label: 'Resumo' },
            { id: 'products', label: `Produtos (${adminProducts.length})` },
            { id: 'articles', label: `Artigos (${adminArticles.length})` },
            { id: 'categories', label: `Categorias (${adminCategories.length})` },
            { id: 'messages', label: `Mensagens (${messages.length})` },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#17191C] text-white'
                : 'text-[#4A4F55] hover:text-[#17191C]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loadingOverview && !stats ? (
        <div className="bg-white border border-black/10 rounded-lg p-8 text-sm text-[#4A4F55]">
          Carregando dados do banco SQLite...
        </div>
      ) : null}

      {/* Tab 1: Dashboard */}
      {activeTab === 'dashboard' && stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-black/10 rounded-lg p-5">
              <div className="flex items-center justify-between text-xs text-[#60656C] mb-1">
                <span>Produtos cadastrados</span>
                <Package className="w-4 h-4 text-[#F47721]" />
              </div>
              <p className="font-mono text-3xl font-bold text-[#17191C] tabular-nums">
                {stats.totalProducts}
              </p>
              <p className="text-xs text-[#4A4F55] mt-1 tabular-nums">
                {stats.publishedProducts} publicados · {stats.draftProducts} em rascunho
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-lg p-5">
              <div className="flex items-center justify-between text-xs text-[#60656C] mb-1">
                <span>Artigos e guias</span>
                <FileText className="w-4 h-4 text-[#F47721]" />
              </div>
              <p className="font-mono text-3xl font-bold text-[#17191C] tabular-nums">
                {stats.totalArticles}
              </p>
              <p className="text-xs text-[#4A4F55] mt-1 tabular-nums">
                {stats.publishedArticles} publicados · {stats.draftArticles} em rascunho
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-lg p-5">
              <div className="flex items-center justify-between text-xs text-[#60656C] mb-1">
                <span>Categorias ativas</span>
                <FolderTree className="w-4 h-4 text-[#F47721]" />
              </div>
              <p className="font-mono text-3xl font-bold text-[#17191C] tabular-nums">
                {stats.totalCategories}
              </p>
              <p className="text-xs text-[#4A4F55] mt-1 tabular-nums">
                {stats.productsWithAffiliateLinks} produtos com link de afiliado
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-lg p-5">
              <div className="flex items-center justify-between text-xs text-[#60656C] mb-1">
                <span>Cliques em links afiliados</span>
                <Link2 className="w-4 h-4 text-[#F47721]" />
              </div>
              <p className="font-mono text-3xl font-bold text-[#17191C] tabular-nums">
                {stats.totalAffiliateClicks}
              </p>
              <p className="text-xs text-[#4A4F55] mt-1">
                Registrados via redirecionamento /go
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-black/10 rounded-lg p-5">
              <h2 className="font-display text-lg font-bold text-[#17191C] mb-3">
                Cliques recentes em ofertas
              </h2>
              {stats.recentClicks.length === 0 ? (
                <p className="text-xs text-[#60656C]">
                  Nenhum clique registrado ainda. Cadastre links do Mercado Livre nos produtos para
                  iniciar o rastreamento.
                </p>
              ) : (
                <ul className="divide-y divide-black/5 text-xs">
                  {stats.recentClicks.map((clk) => (
                    <li key={clk.id} className="py-2.5 flex items-center justify-between gap-3">
                      <span className="font-medium text-[#17191C] truncate">
                        {clk.productName} ({clk.linkLabel})
                      </span>
                      <span className="font-mono text-[#60656C] tabular-nums shrink-0">
                        {new Date(clk.clickedAt).toLocaleString('pt-BR')}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white border border-black/10 rounded-lg p-5">
              <h2 className="font-display text-lg font-bold text-[#17191C] mb-3">
                Atualizações recentes no catálogo
              </h2>
              <ul className="divide-y divide-black/5 text-xs">
                {adminProducts.slice(0, 6).map((p) => (
                  <li key={p.id} className="py-2.5 flex items-center justify-between gap-3">
                    <span className="font-medium text-[#17191C] truncate">{p.name}</span>
                    <span className="text-[#60656C] shrink-0">
                      {p.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Products */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="bg-white border border-black/10 rounded-lg p-3 flex flex-wrap gap-3 items-center text-xs">
            <input
              type="search"
              value={prodFilterQuery}
              onChange={(e) => setProdFilterQuery(e.target.value)}
              placeholder="Filtrar produto por nome, marca ou subcategoria..."
              className="flex-1 min-w-[220px] border border-black/15 rounded px-3 py-1.5"
            />
            <select
              value={prodFilterCat}
              onChange={(e) => setProdFilterCat(e.target.value)}
              className="border border-black/15 rounded px-3 py-1.5 bg-white"
            >
              <option value="all">Todas categorias</option>
              {adminCategories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={prodFilterStatus}
              onChange={(e) => setProdFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
              className="border border-black/15 rounded px-3 py-1.5 bg-white"
            >
              <option value="all">Todos status</option>
              <option value="published">Publicados</option>
              <option value="draft">Rascunhos</option>
            </select>
          </div>

          <div className="bg-white border border-black/10 rounded-lg overflow-x-auto">
            <table className="w-full min-w-[780px] text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F2F2EF] border-b border-black/10 text-[#17191C] font-semibold">
                  <th className="py-3 px-4">Produto</th>
                  <th className="py-3 px-4">Subcategoria / Categoria</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Afiliado Mercado Livre</th>
                  <th className="py-3 px-4 text-right">Cliques</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {adminProducts
                  .filter((p) => {
                    if (prodFilterCat !== 'all' && p.categorySlug !== prodFilterCat) return false;
                    if (prodFilterStatus !== 'all' && p.status !== prodFilterStatus) return false;
                    if (prodFilterQuery.trim()) {
                      const q = prodFilterQuery.trim().toLowerCase();
                      const txt = `${p.name} ${p.brand} ${p.model} ${p.subcategory ?? ''}`.toLowerCase();
                      if (!txt.includes(q)) return false;
                    }
                    return true;
                  })
                  .map((prod) => {
                    const primary = getPrimaryAffiliateLink(prod);
                    const hasUrl = Boolean(primary && isValidAffiliateUrl(primary.url));
                    const price = formatBrlFromCents(primary?.priceCents);
                    const totalClicks = prod.affiliateLinks.reduce((sum, l) => sum + l.clicksCount, 0);
                    return (
                      <tr key={prod.id} className="hover:bg-[#F2F2EF]/50">
                        <td className="py-3 px-4 font-semibold text-[#17191C] max-w-xs">
                          <span className="line-clamp-1">{prod.name}</span>
                        </td>
                        <td className="py-3 px-4 text-[#4A4F55]">
                          {prod.subcategory || prod.toolType} · {prod.brand}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-semibold ${
                              prod.status === 'published' ? 'text-emerald-700' : 'text-amber-700'
                            }`}
                          >
                            {prod.status === 'published' ? 'Publicado' : 'Rascunho'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {hasUrl ? (
                            <span className="text-emerald-700 font-medium">
                              Link ativo {price ? `(${price})` : ''}
                            </span>
                          ) : (
                            <span className="text-[#60656C]">Pendente de cadastro</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums">{totalClicks}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => navigate(`/produto/${prod.slug}`)}
                              aria-label={`Visualizar ${prod.name}`}
                              className="p-1.5 rounded hover:bg-black/5 text-[#4A4F55]"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingProduct(prod)}
                              aria-label={`Editar ${prod.name}`}
                              className="p-1.5 rounded hover:bg-black/5 text-[#17191C]"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleDeleteProduct(prod)}
                              aria-label={`Excluir ${prod.name}`}
                              className="p-1.5 rounded hover:bg-red-50 text-red-700"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Articles */}
      {activeTab === 'articles' && (
        <div className="space-y-4">
          <div className="bg-white border border-black/10 rounded-lg p-3 flex flex-wrap gap-3 items-center text-xs">
            <input
              type="search"
              value={artFilterQuery}
              onChange={(e) => setArtFilterQuery(e.target.value)}
              placeholder="Filtrar guias ou pautas de comparativo..."
              className="flex-1 min-w-[220px] border border-black/15 rounded px-3 py-1.5"
            />
            <select
              value={artFilterType}
              onChange={(e) => setArtFilterType(e.target.value as 'all' | 'guia' | 'comparativo')}
              className="border border-black/15 rounded px-3 py-1.5 bg-white"
            >
              <option value="all">Todos os formatos</option>
              <option value="guia">Guias de compra</option>
              <option value="comparativo">Comparativos</option>
            </select>
            <select
              value={artFilterStatus}
              onChange={(e) => setArtFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
              className="border border-black/15 rounded px-3 py-1.5 bg-white"
            >
              <option value="all">Todos status</option>
              <option value="published">Publicados</option>
              <option value="draft">Rascunhos / Pautas</option>
            </select>
          </div>

          <div className="bg-white border border-black/10 rounded-lg overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F2F2EF] border-b border-black/10 text-[#17191C] font-semibold">
                  <th className="py-3 px-4">Título</th>
                  <th className="py-3 px-4">Formato</th>
                  <th className="py-3 px-4">Categoria</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {adminArticles
                  .filter((a) => {
                    if (artFilterType !== 'all' && a.articleType !== artFilterType) return false;
                    if (artFilterStatus !== 'all' && a.status !== artFilterStatus) return false;
                    if (artFilterQuery.trim() && !a.title.toLowerCase().includes(artFilterQuery.trim().toLowerCase())) {
                      return false;
                    }
                    return true;
                  })
                  .map((art) => (
                    <tr key={art.id} className="hover:bg-[#F2F2EF]/50">
                      <td className="py-3 px-4 font-semibold text-[#17191C]">{art.title}</td>
                      <td className="py-3 px-4 text-[#4A4F55]">
                        {art.articleType === 'comparativo' ? 'Comparativo' : 'Guia'}
                      </td>
                      <td className="py-3 px-4 text-[#4A4F55]">{art.categorySlug}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            art.status === 'published' ? 'text-emerald-700' : 'text-amber-700'
                          }`}
                        >
                          {art.status === 'published' ? 'Publicado' : 'Rascunho'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => navigate(`/artigo/${art.slug}`)}
                            aria-label={`Visualizar ${art.title}`}
                            className="p-1.5 rounded hover:bg-black/5 text-[#4A4F55]"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingArticle(art)}
                            aria-label={`Editar ${art.title}`}
                            className="p-1.5 rounded hover:bg-black/5 text-[#17191C]"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDeleteArticle(art)}
                            aria-label={`Excluir ${art.title}`}
                            className="p-1.5 rounded hover:bg-red-50 text-red-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Categories */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => openCategoryForm()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#17191C] text-white text-xs font-semibold hover:bg-[#F47721] hover:text-[#17191C] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova categoria</span>
            </button>
          </div>

          {catFormOpen && (
            <form
              onSubmit={handleSaveCategory}
              className="bg-white border border-black/15 rounded-lg p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">Nome completo *</label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => {
                    setCatName(e.target.value);
                    if (!catId) setCatSlug(slugify(e.target.value));
                  }}
                  className="w-full border border-black/15 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Nome curto (menu)</label>
                <input
                  type="text"
                  value={catShortName}
                  onChange={(e) => setCatShortName(e.target.value)}
                  className="w-full border border-black/15 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Slug</label>
                <input
                  type="text"
                  value={catSlug}
                  onChange={(e) => setCatSlug(e.target.value)}
                  className="w-full border border-black/15 rounded px-3 py-2 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Ordem de exibição</label>
                <input
                  type="number"
                  value={catOrder}
                  onChange={(e) => setCatOrder(Number(e.target.value))}
                  className="w-full border border-black/15 rounded px-3 py-2 tabular-nums"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1">Descrição</label>
                <textarea
                  rows={2}
                  value={catDescription}
                  onChange={(e) => setCatDescription(e.target.value)}
                  className="w-full border border-black/15 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Subtópicos (separados por vírgula)</label>
                <input
                  type="text"
                  value={catSubtopics}
                  onChange={(e) => setCatSubtopics(e.target.value)}
                  className="w-full border border-black/15 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">URL da imagem</label>
                <input
                  type="text"
                  value={catImageUrl}
                  onChange={(e) => setCatImageUrl(e.target.value)}
                  className="w-full border border-black/15 rounded px-3 py-2 font-mono"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCatFormOpen(false)}
                  className="px-4 py-2 rounded border border-black/15 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#F47721] text-[#17191C] font-bold"
                >
                  Salvar categoria
                </button>
              </div>
            </form>
          )}

          <div className="bg-white border border-black/10 rounded-lg divide-y divide-black/5">
            {adminCategories.map((cat) => (
              <div key={cat.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                <div>
                  <p className="font-semibold text-sm text-[#17191C]">
                    {cat.displayOrder}. {cat.name}
                  </p>
                  <p className="text-[#4A4F55] mt-0.5">{cat.description}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => openCategoryForm(cat)}
                    aria-label={`Editar categoria ${cat.name}`}
                    className="p-2 rounded hover:bg-black/5 text-[#17191C]"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDeleteCategory(cat)}
                    aria-label={`Excluir categoria ${cat.name}`}
                    className="p-2 rounded hover:bg-red-50 text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Contact Messages */}
      {activeTab === 'messages' && (
        <div className="bg-white border border-black/10 rounded-lg divide-y divide-black/5">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#60656C] flex flex-col items-center gap-2">
              <Mail className="w-5 h-5 text-[#A9ADB2]" />
              <span>Nenhuma mensagem recebida pelo formulário de contato ainda.</span>
            </div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="p-5 space-y-1.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm text-[#17191C]">{m.subject}</span>
                  <span className="font-mono text-[#60656C] tabular-nums">
                    {new Date(m.createdAt).toLocaleString('pt-BR')}
                  </span>
                </div>
                <p className="text-[#4A4F55]">
                  De: <strong>{m.name}</strong> ({m.email})
                </p>
                <p className="text-[#25292D] pt-1 leading-relaxed">{m.message}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modals */}
      {editingProduct !== undefined && (
        <ProductFormModal
          initial={editingProduct}
          categories={adminCategories}
          onClose={() => setEditingProduct(undefined)}
          onSaved={handleDataChanged}
        />
      )}

      {editingArticle !== undefined && (
        <ArticleFormModal
          initial={editingArticle}
          categories={adminCategories}
          products={adminProducts}
          onClose={() => setEditingArticle(undefined)}
          onSaved={handleDataChanged}
        />
      )}
    </div>
  );
}
