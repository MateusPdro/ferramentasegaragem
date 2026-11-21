import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SafeImage } from '../components/SafeImage';
import { usePortal } from '../context/PortalContext';
import { applyPageSeo } from '../lib/seo';

export function GuidesPage() {
  const { articles, categories, navigate } = usePortal();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState<'all' | 'guia' | 'comparativo'>('all');

  useEffect(() => {
    applyPageSeo({
      title: 'Guias de Compra e Artigos Técnicos',
      description:
        'Aprenda a escolher parafusadeiras, esmerilhadeiras, lavadoras de alta pressão, scanners OBD2 e jogos de ferramentas sem cair em erros.',
      path: '/guias',
    });
  }, []);

  const filtered = useMemo(
    () =>
      articles.filter((a) => {
        if (selectedCategory !== 'all' && a.categorySlug !== selectedCategory) return false;
        if (selectedType !== 'all' && a.articleType !== selectedType) return false;
        return true;
      }),
    [articles, selectedCategory, selectedType]
  );

  const catNameMap = new Map(categories.map((c) => [c.slug, c.name]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: 'Guias e Artigos' }]} />

      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#17191C]">
          Guias de Compra e Artigos Técnicos
        </h1>
        <p className="text-sm text-[#4A4F55] mt-1 max-w-2xl">
          Conteúdo educativo e comparativos imparciais para ajudar você a interpretar
          especificações reais antes de investir em ferramentas.
        </p>
      </div>

      <div className="bg-white border border-black/10 rounded-lg p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#17191C] text-white'
                : 'bg-[#F2F2EF] text-[#25292D] hover:bg-black/10'
            }`}
          >
            Todas as categorias
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-[#17191C] text-white'
                  : 'bg-[#F2F2EF] text-[#25292D] hover:bg-black/10'
              }`}
            >
              {cat.shortName}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#F2F2EF] rounded-md self-start sm:self-auto">
          {(
            [
              { id: 'all', label: 'Todos' },
              { id: 'guia', label: 'Guias' },
              { id: 'comparativo', label: 'Comparativos' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                selectedType === t.id
                  ? 'bg-white text-[#17191C] shadow-xs'
                  : 'text-[#4A4F55] hover:text-[#17191C]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-black/10 rounded-lg p-8 text-center">
          <p className="text-sm text-[#4A4F55]">Nenhum artigo encontrado para este filtro.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
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
                  <span className="text-[#F47721] font-semibold">
                    {art.articleType === 'comparativo' ? 'Comparativo' : 'Guia'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{catNameMap.get(art.categorySlug) ?? art.categorySlug}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readMinutes} min</span>
                </div>
                <h2 className="font-display text-xl font-semibold text-[#17191C] group-hover:text-[#F47721] transition-colors">
                  {art.title}
                </h2>
                <p className="text-sm text-[#4A4F55] leading-relaxed mt-2 flex-1">
                  {art.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#17191C]">
                  <span>Ler artigo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
