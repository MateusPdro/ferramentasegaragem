import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, RotateCcw, Search } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { usePortal } from '../context/PortalContext';
import { filterArticles, filterProducts, getDistinctFilterValues } from '../lib/catalog';
import { applyPageSeo } from '../lib/seo';

export function SearchPage() {
  const { categories, products, articles, searchParams, navigate } = usePortal();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [categorySlug, setCategorySlug] = useState('all');
  const [subcategory, setSubcategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const [application, setApplication] = useState('all');
  const [priceRange, setPriceRange] = useState<'all' | 'under-300' | '300-700' | 'over-700' | 'verified-only'>('all');

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  useEffect(() => {
    applyPageSeo({
      title: query ? `Busca: ${query}` : 'Catálogo Completo e Pesquisa de Ferramentas',
      description:
        'Pesquise análises de ferramentas, marcas, modelos, equipamentos automotivos e guias de compra no portal Ferramentas & Garagem.',
      path: '/ferramentas',
    });
  }, [query]);

  const choices = useMemo(
    () => getDistinctFilterValues(products, categorySlug, subcategory),
    [products, categorySlug, subcategory]
  );

  const matchedProducts = useMemo(
    () =>
      filterProducts(products, {
        query,
        categorySlug,
        subcategory,
        brand,
        application,
        priceRange,
      }),
    [products, query, categorySlug, subcategory, brand, application, priceRange]
  );

  const matchedArticles = useMemo(
    () => filterArticles(articles, query, categorySlug),
    [articles, query, categorySlug]
  );

  const resetAll = () => {
    setQuery('');
    setCategorySlug('all');
    setSubcategory('all');
    setBrand('all');
    setApplication('all');
    setPriceRange('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: 'Catálogo e Pesquisa' }]} />

      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#17191C]">
          Catálogo de Ferramentas e Guias
        </h1>
        <p className="text-sm text-[#4A4F55] mt-1">
          Localize produtos por categoria, subcategoria, marca, modelo, aplicação ou pesquise nos
          guias editoriais.
        </p>
      </div>

      {/* Search & Filter Panel */}
      <div className="bg-white border border-black/10 rounded-lg p-5 mb-8 space-y-4">
        <div className="relative">
          <label htmlFor="catalog-search" className="sr-only">
            Pesquisar produtos, marcas, modelos ou artigos
          </label>
          <Search className="w-4 h-4 text-[#60656C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o nome, marca ou modelo (ex.: Bosch, Makita, V519, Spot Cleaner, GTW 10)..."
            className="w-full border border-black/15 rounded-md pl-10 pr-4 py-2.5 text-sm text-[#17191C] focus:outline-none focus:border-[#F47721]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label htmlFor="f-cat" className="block text-xs font-semibold text-[#25292D] mb-1">
              Categoria
            </label>
            <select
              id="f-cat"
              value={categorySlug}
              onChange={(e) => {
                setCategorySlug(e.target.value);
                setSubcategory('all');
                setBrand('all');
                setApplication('all');
              }}
              className="w-full border border-black/15 rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="all">Todas</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="f-sub" className="block text-xs font-semibold text-[#25292D] mb-1">
              Subcategoria / Tipo
            </label>
            <select
              id="f-sub"
              value={subcategory}
              onChange={(e) => {
                setSubcategory(e.target.value);
                setBrand('all');
                setApplication('all');
              }}
              className="w-full border border-black/15 rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="all">Todos os tipos</option>
              {choices.subcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="f-brand" className="block text-xs font-semibold text-[#25292D] mb-1">
              Fabricante
            </label>
            <select
              id="f-brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border border-black/15 rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="all">Todos</option>
              {choices.brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="f-app" className="block text-xs font-semibold text-[#25292D] mb-1">
              Aplicação
            </label>
            <select
              id="f-app"
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              className="w-full border border-black/15 rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="all">Todas</option>
              {choices.applications.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="f-price" className="block text-xs font-semibold text-[#25292D] mb-1">
              Faixa de preço verificado
            </label>
            <select
              id="f-price"
              value={priceRange}
              onChange={(e) =>
                setPriceRange(
                  e.target.value as 'all' | 'under-300' | '300-700' | 'over-700' | 'verified-only'
                )
              }
              className="w-full border border-black/15 rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="all">Qualquer</option>
              <option value="verified-only">Com preço cadastrado</option>
              <option value="under-300">Até R$ 300</option>
              <option value="300-700">R$ 300 a R$ 700</option>
              <option value="over-700">Acima de R$ 700</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-black/5 text-xs text-[#60656C]">
          <span className="tabular-nums">
            {matchedProducts.length} produto(s) e {matchedArticles.length} artigo(s) encontrado(s)
          </span>
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 text-[#17191C] hover:text-[#F47721] font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar busca e filtros</span>
          </button>
        </div>
      </div>

      {/* Results: Products */}
      {matchedProducts.length === 0 && matchedArticles.length === 0 ? (
        <div className="bg-white border border-black/10 rounded-lg p-10 text-center space-y-3">
          <h2 className="font-display text-2xl font-bold text-[#17191C]">
            Nenhum resultado encontrado
          </h2>
          <p className="text-sm text-[#4A4F55] max-w-md mx-auto">
            Não encontramos ferramentas ou artigos compatíveis com os critérios selecionados. Tente
            buscar por um termo mais amplo ou limpar os filtros.
          </p>
          <button
            type="button"
            onClick={resetAll}
            className="px-5 py-2.5 rounded-md bg-[#F47721] text-[#17191C] text-sm font-bold"
          >
            Mostrar tudo
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {matchedProducts.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-[#17191C] mb-5">
                Produtos analisados ({matchedProducts.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {matchedArticles.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-[#17191C] mb-5">
                Guias e comparativos relacionados ({matchedArticles.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchedArticles.map((art) => (
                  <a
                    key={art.id}
                    href={`/artigo/${art.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/artigo/${art.slug}`);
                    }}
                    className="bg-white border border-black/10 rounded-lg p-5 hover:border-[#F47721] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-medium text-[#F47721]">
                        {art.articleType === 'comparativo' ? 'Comparativo' : 'Guia'} ·{' '}
                        {art.readMinutes} min de leitura
                      </span>
                      <h3 className="font-display text-lg font-semibold text-[#17191C] mt-1">
                        {art.title}
                      </h3>
                      <p className="text-sm text-[#4A4F55] mt-2">{art.summary}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#17191C]">
                      <span>Ler conteúdo completo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
