import { useEffect } from 'react';
import { ArrowRight, BookOpen, Scale } from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { applyPageSeo } from '../lib/seo';
import { ProductCard } from '../components/ProductCard';
import { SafeImage } from '../components/SafeImage';

export function HomePage() {
  const { categories, products, articles, navigate, loading } = usePortal();

  useEffect(() => {
    applyPageSeo({
      title: 'Ferramentas & Garagem – Escolha certo. Trabalhe melhor.',
      description:
        'Portal editorial de análises técnicas, comparativos imparciais e guias de compra de ferramentas elétricas, manuais e equipamentos automotivos.',
      path: '/',
    });
  }, []);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 6);
  const comparativoArticles = articles.filter((a) => a.articleType === 'comparativo').slice(0, 4);
  const guideArticles = articles.filter((a) => a.articleType === 'guia').slice(0, 4);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-[#17191C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <SafeImage
            src="/src/assets/images/hero_garage_workshop_1795185271882.jpg"
            alt="Bancada profissional de oficina automotiva com ferramentas organizadas"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#17191C] via-[#17191C]/85 to-[#17191C]/35" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="max-w-2xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FF9147]">
              Ferramentas &amp; Garagem · Escolha certo. Trabalhe melhor.
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-white">
              Encontre a ferramenta certa para cada trabalho.
            </h1>
            <p className="text-base sm:text-lg text-[#D4D7DC] leading-relaxed max-w-xl">
              Análises, comparativos e recomendações para você comprar melhor e trabalhar com mais
              eficiência.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="/ferramentas"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/ferramentas');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#F47721] hover:bg-[#FF9147] text-[#17191C] text-sm font-bold transition-colors"
              >
                <span>Explorar ferramentas</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/comparativos"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/comparativos');
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md border border-white/25 bg-[#202328]/80 hover:bg-[#202328] text-white text-sm font-semibold transition-colors"
              >
                <Scale className="w-4 h-4 text-[#FF9147]" />
                <span>Comparar modelos</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias Principais */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#17191C]">
              Categorias especializadas
            </h2>
            <p className="text-sm text-[#4A4F55] mt-1">
              Explore análises técnicas organizadas por tipo de equipamento e aplicação na oficina.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/categoria/${cat.slug}`);
              }}
              className="group bg-white border border-black/10 rounded-lg overflow-hidden flex flex-col hover:-translate-y-0.5 hover:border-[#F47721]/60 transition-all duration-150"
            >
              <div className="aspect-[4/3] bg-[#202328] overflow-hidden">
                <SafeImage
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display text-xl font-semibold text-[#17191C] group-hover:text-[#F47721] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-[#4A4F55] leading-relaxed mt-2 flex-1 line-clamp-3">
                  {cat.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#17191C] group-hover:text-[#F47721]">
                  <span>Ver categoria</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Ferramentas em Destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-black/10 pb-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#17191C]">
              Ferramentas em destaque
            </h2>
            <p className="text-sm text-[#4A4F55] mt-1">
              Fichas técnicas verificadas, pontos fortes, limitações reais e indicação de uso.
            </p>
          </div>
          <a
            href="/ferramentas"
            onClick={(e) => {
              e.preventDefault();
              navigate('/ferramentas');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F47721] hover:text-[#17191C] transition-colors whitespace-nowrap"
          >
            <span>Ver todo o catálogo ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-white/70 border border-black/10 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Compare Antes de Comprar */}
      <section className="bg-[#202328] text-white py-14 my-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Compare antes de comprar
              </h2>
              <p className="text-sm text-[#A9ADB2] mt-1 max-w-2xl">
                Coloque até três modelos da mesma categoria lado a lado no comparador técnico ou
                leia nossos comparativos editoriais antes de decidir.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/comparativos')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#F47721] hover:bg-[#FF9147] text-[#17191C] text-sm font-bold transition-colors whitespace-nowrap self-start lg:self-auto"
            >
              <Scale className="w-4 h-4" />
              <span>Abrir comparador técnico</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparativoArticles.map((art) => (
              <a
                key={art.id}
                href={`/artigo/${art.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/artigo/${art.slug}`);
                }}
                className="group bg-[#17191C] border border-white/10 rounded-lg p-6 hover:border-[#F47721] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#FF9147] font-medium mb-2">
                    <span>Comparativo técnico</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#A9ADB2]">{art.readMinutes} min de leitura</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white group-hover:text-[#FF9147] transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-sm text-[#A9ADB2] leading-relaxed mt-2">{art.summary}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#FF9147]">
                  <span>Ler comparativo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Guias de Compra */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-black/10 pb-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#17191C]">
              Guias de compra e orientação prática
            </h2>
            <p className="text-sm text-[#4A4F55] mt-1">
              Artigos educativos para entender especificações reais sem cair em armadilhas de
              marketing.
            </p>
          </div>
          <a
            href="/guias"
            onClick={(e) => {
              e.preventDefault();
              navigate('/guias');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F47721] hover:text-[#17191C] transition-colors whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" />
            <span>Todos os guias</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(guideArticles.length > 0 ? guideArticles : articles.slice(0, 3)).map((art) => (
            <a
              key={art.id}
              href={`/artigo/${art.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/artigo/${art.slug}`);
              }}
              className="group bg-white border border-black/10 rounded-lg overflow-hidden flex flex-col hover:-translate-y-0.5 transition-transform duration-150"
            >
              <div className="aspect-[4/3] bg-[#202328] overflow-hidden">
                <SafeImage
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-[#60656C] mb-1.5">
                  <span>Guia de compra</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readMinutes} min de leitura</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#17191C] group-hover:text-[#F47721] transition-colors">
                  {art.title}
                </h3>
                <p className="text-sm text-[#4A4F55] leading-relaxed mt-2 flex-1 line-clamp-3">
                  {art.summary}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
