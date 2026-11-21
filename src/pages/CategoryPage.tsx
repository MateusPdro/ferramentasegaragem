import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { usePortal } from '../context/PortalContext';
import { filterArticles, filterProducts, getDistinctFilterValues } from '../lib/catalog';
import { applyPageSeo } from '../lib/seo';

export function CategoryPage({ slug }: { slug: string }) {
  const { categories, products, articles, navigate } = usePortal();
  const category = categories.find((c) => c.slug === slug);

  const [brand, setBrand] = useState('all');
  const [subcategory, setSubcategory] = useState('all');
  const [application, setApplication] = useState('all');

  useEffect(() => {
    setBrand('all');
    setSubcategory('all');
    setApplication('all');
  }, [slug]);

  useEffect(() => {
    if (category) {
      applyPageSeo({
        title: `${category.name} – Análises e Guias`,
        description: category.description,
        path: `/categoria/${category.slug}`,
      });
    }
  }, [category]);

  const filterChoices = useMemo(
    () => getDistinctFilterValues(products, slug, subcategory),
    [products, slug, subcategory]
  );

  const filteredProducts = useMemo(
    () =>
      filterProducts(products, {
        categorySlug: slug,
        subcategory,
        brand,
        application,
      }),
    [products, slug, subcategory, brand, application]
  );

  const relatedArticles = useMemo(
    () => filterArticles(articles, '', slug),
    [articles, slug]
  );

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
        <h1 className="font-display text-3xl font-bold text-[#17191C]">Categoria não encontrada</h1>
        <p className="text-sm text-[#4A4F55]">
          Verifique o endereço ou explore todas as ferramentas disponíveis no portal.
        </p>
        <button
          type="button"
          onClick={() => navigate('/ferramentas')}
          className="px-5 py-2.5 rounded-md bg-[#F47721] text-[#17191C] text-sm font-bold"
        >
          Explorar catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: category.name }]} />

      <div className="bg-[#17191C] text-white rounded-lg p-6 sm:p-8 mb-6">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{category.name}</h1>
        <p className="text-sm sm:text-base text-[#D4D7DC] mt-2 max-w-3xl leading-relaxed">
          {category.description}
        </p>
        {category.subtopics.length > 0 && (
          <p className="text-xs text-[#A9ADB2] mt-4">
            <strong className="text-[#FF9147] font-semibold">Linhas cobertas:</strong>{' '}
            {category.subtopics.join(' · ')}
          </p>
        )}
      </div>

      {/* Subcategory Quick Navigation */}
      {filterChoices.subcategories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2" aria-label="Subcategorias disponíveis">
          <button
            type="button"
            onClick={() => {
              setSubcategory('all');
              setBrand('all');
              setApplication('all');
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              subcategory === 'all'
                ? 'bg-[#17191C] text-white'
                : 'bg-white border border-black/10 text-[#25292D] hover:border-[#F47721]'
            }`}
          >
            Todos os tipos
          </button>
          {filterChoices.subcategories.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => {
                setSubcategory(sub);
                setBrand('all');
                setApplication('all');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                subcategory === sub
                  ? 'bg-[#F47721] text-[#17191C]'
                  : 'bg-white border border-black/10 text-[#25292D] hover:border-[#F47721]'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Category Filters */}
      <div className="bg-white border border-black/10 rounded-lg p-4 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="cat-sub" className="block text-xs font-semibold text-[#25292D] mb-1">
            Subcategoria / Tipo
          </label>
          <select
            id="cat-sub"
            value={subcategory}
            onChange={(e) => {
              setSubcategory(e.target.value);
              setBrand('all');
              setApplication('all');
            }}
            className="w-full border border-black/15 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="all">Todas as subcategorias</option>
            {filterChoices.subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cat-brand" className="block text-xs font-semibold text-[#25292D] mb-1">
            Fabricante / Marca
          </label>
          <select
            id="cat-brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border border-black/15 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="all">Todas as marcas</option>
            {filterChoices.brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cat-app" className="block text-xs font-semibold text-[#25292D] mb-1">
            Aplicação principal
          </label>
          <select
            id="cat-app"
            value={application}
            onChange={(e) => setApplication(e.target.value)}
            className="w-full border border-black/15 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="all">Todas as aplicações</option>
            {filterChoices.applications.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-black/10 rounded-lg p-8 text-center space-y-3">
          <p className="text-base font-semibold text-[#17191C]">
            Nenhum produto encontrado com esses filtros nesta categoria.
          </p>
          <button
            type="button"
            onClick={() => {
              setBrand('all');
              setSubcategory('all');
              setApplication('all');
            }}
            className="px-4 py-2 rounded-md bg-[#17191C] text-white text-xs font-semibold"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Related Editorial Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-14 pt-10 border-t border-black/10">
          <h2 className="font-display text-2xl font-bold text-[#17191C] mb-5">
            Guias e comparativos relacionados a {category.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((art) => (
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
                    {art.articleType === 'comparativo' ? 'Comparativo' : 'Guia de compra'} ·{' '}
                    {art.readMinutes} min
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[#17191C] mt-1">
                    {art.title}
                  </h3>
                  <p className="text-sm text-[#4A4F55] mt-2">{art.summary}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#17191C]">
                  <span>Ler artigo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
