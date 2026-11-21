import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, Plus, Scale, Sparkles, Trash2, X } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SafeImage } from '../components/SafeImage';
import { usePortal } from '../context/PortalContext';
import {
  buildComparisonRows,
  getDistinctFilterValues,
  getPrimaryAffiliateLink,
  getProductSubcategory,
  isValidAffiliateUrl,
  normalizeText,
} from '../lib/catalog';
import { applyPageSeo } from '../lib/seo';

export function ComparatorPage() {
  const {
    categories,
    products,
    compareIds,
    toggleCompare,
    removeFromCompare,
    clearCompare,
    navigate,
  } = usePortal();

  const comparedProducts = useMemo(
    () =>
      compareIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    [compareIds, products]
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (comparedProducts[0]) return comparedProducts[0].categorySlug;
    return categories[0]?.slug ?? 'ferramentas-eletricas';
  });

  const subcategoriesInCategory = useMemo(
    () => getDistinctFilterValues(products, selectedCategory).subcategories,
    [products, selectedCategory]
  );

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(() => {
    if (comparedProducts[0]) return getProductSubcategory(comparedProducts[0]);
    return subcategoriesInCategory[0] ?? '';
  });

  const [onlyDifferences, setOnlyDifferences] = useState(false);

  // Sync category and subcategory when products are selected externally
  useEffect(() => {
    if (comparedProducts[0]) {
      setSelectedCategory(comparedProducts[0].categorySlug);
      setSelectedSubcategory(getProductSubcategory(comparedProducts[0]));
    } else if (categories.length > 0 && !categories.some((c) => c.slug === selectedCategory)) {
      setSelectedCategory(categories[0].slug);
    }
  }, [comparedProducts, categories, selectedCategory]);

  useEffect(() => {
    if (comparedProducts[0]) return;
    if (
      subcategoriesInCategory.length > 0 &&
      !subcategoriesInCategory.some((s) => normalizeText(s) === normalizeText(selectedSubcategory))
    ) {
      setSelectedSubcategory(subcategoriesInCategory[0]);
    } else if (subcategoriesInCategory.length === 0) {
      setSelectedSubcategory('');
    }
  }, [comparedProducts, subcategoriesInCategory, selectedSubcategory]);

  useEffect(() => {
    applyPageSeo({
      title: 'Comparador Inteligente de Ferramentas',
      description:
        'Compare até três ferramentas equivalentes do mesmo tipo lado a lado por especificações técnicas, vantagens, limitações e indicação de uso.',
      path: '/comparativos',
    });
  }, []);

  const scopedSubcategoryProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.categorySlug === selectedCategory &&
          (!selectedSubcategory ||
            normalizeText(getProductSubcategory(p)) === normalizeText(selectedSubcategory))
      ),
    [products, selectedCategory, selectedSubcategory]
  );

  const availableInSubcategory = useMemo(
    () => scopedSubcategoryProducts.filter((p) => !compareIds.includes(p.id)),
    [scopedSubcategoryProducts, compareIds]
  );

  const comparisonRows = useMemo(() => {
    const rows = buildComparisonRows(comparedProducts, categories);
    if (!onlyDifferences || comparedProducts.length < 2) return rows;
    return rows.filter((r) => r.hasDifferences);
  }, [comparedProducts, categories, onlyDifferences]);

  const handleCategoryChange = (newSlug: string) => {
    if (comparedProducts.length > 0 && comparedProducts[0].categorySlug !== newSlug) {
      clearCompare();
    }
    setSelectedCategory(newSlug);
    const nextSubs = getDistinctFilterValues(products, newSlug).subcategories;
    setSelectedSubcategory(nextSubs[0] ?? '');
  };

  const handleSubcategoryChange = (newSub: string) => {
    if (
      comparedProducts.length > 0 &&
      normalizeText(getProductSubcategory(comparedProducts[0])) !== normalizeText(newSub)
    ) {
      clearCompare();
    }
    setSelectedSubcategory(newSub);
  };

  const handleCompareAllEquivalent = () => {
    clearCompare();
    const candidates = scopedSubcategoryProducts.slice(0, 3);
    // Queue sequentially cleanly using direct selection logic
    for (const prod of candidates) {
      toggleCompare(prod.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: 'Comparador Inteligente' }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#17191C]">
            Comparador Inteligente de Ferramentas
          </h1>
          <p className="text-sm text-[#4A4F55] mt-1 max-w-3xl">
            Compare apenas ferramentas equivalentes dentro do mesmo tipo técnico. Escolha a categoria,
            selecione a subcategoria e coloque até 3 modelos lado a lado.
          </p>
        </div>
        {comparedProducts.length > 0 && (
          <button
            type="button"
            onClick={clearCompare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-black/15 bg-white text-xs font-semibold text-[#17191C] hover:border-[#F47721] self-start md:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar seleção</span>
          </button>
        )}
      </div>

      {/* 3-Step Smart Selector */}
      <div className="bg-white border border-black/10 rounded-lg p-5 mb-8 space-y-5">
        {/* Passo 1 */}
        <div>
          <span className="block text-xs font-semibold text-[#25292D] mb-2">
            1. Escolha a categoria principal
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#17191C] text-white'
                      : 'bg-[#F2F2EF] text-[#25292D] hover:bg-black/10'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Passo 2 */}
        <div className="pt-4 border-t border-black/10">
          <span className="block text-xs font-semibold text-[#25292D] mb-2">
            2. Escolha o tipo de produto / subcategoria equivalente
          </span>
          {subcategoriesInCategory.length === 0 ? (
            <p className="text-xs text-[#60656C]">Nenhuma subcategoria disponível nesta categoria.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {subcategoriesInCategory.map((sub) => {
                const active = normalizeText(selectedSubcategory) === normalizeText(sub);
                const count = products.filter(
                  (p) =>
                    p.categorySlug === selectedCategory &&
                    normalizeText(getProductSubcategory(p)) === normalizeText(sub)
                ).length;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => handleSubcategoryChange(sub)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap tabular-nums ${
                      active
                        ? 'bg-[#F47721] text-[#17191C]'
                        : 'bg-[#F2F2EF] text-[#25292D] hover:bg-black/10'
                    }`}
                  >
                    {sub} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Passo 3 */}
        <div className="pt-4 border-t border-black/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="block text-xs font-semibold text-[#25292D]">
              3. Selecione até 3 modelos equivalentes ({comparedProducts.length}/3 selecionados)
            </span>
            {scopedSubcategoryProducts.length >= 2 && comparedProducts.length === 0 && (
              <button
                type="button"
                onClick={handleCompareAllEquivalent}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#17191C] hover:bg-[#F47721] hover:text-[#17191C] text-white text-xs font-semibold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Comparar {Math.min(3, scopedSubcategoryProducts.length)} modelos deste tipo</span>
              </button>
            )}
          </div>

          {comparedProducts.length >= 3 ? (
            <p className="text-xs text-[#4A4F55]">
              Limite de 3 modelos atingido. Remova um item da tabela abaixo para testar outro.
            </p>
          ) : availableInSubcategory.length === 0 ? (
            <p className="text-xs text-[#4A4F55]">
              Todos os modelos disponíveis desta subcategoria já estão selecionados.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {availableInSubcategory.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => toggleCompare(prod.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-black/15 bg-[#F2F2EF]/70 hover:border-[#F47721] hover:bg-[#F47721]/10 text-xs font-medium text-[#17191C] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#F47721]" />
                  <span>{prod.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {comparedProducts.length === 0 ? (
        <div className="bg-white border border-black/10 rounded-lg p-10 text-center space-y-3">
          <Scale className="w-8 h-8 text-[#F47721] mx-auto" />
          <h2 className="font-display text-2xl font-bold text-[#17191C]">
            Selecione modelos em {selectedSubcategory || 'uma subcategoria'} para iniciar
          </h2>
          <p className="text-sm text-[#4A4F55] max-w-lg mx-auto">
            Clique nos botões acima para adicionar até 3 ferramentas do mesmo tipo e visualizar
            especificações, vantagens, limitações e indicação lado a lado.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comparedProducts.length > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-[#4A4F55]">
              <span>
                Linhas com borda laranja à esquerda indicam especificações diferentes entre os modelos.
              </span>
              <label className="inline-flex items-center gap-2 font-semibold text-[#17191C] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyDifferences}
                  onChange={(e) => setOnlyDifferences(e.target.checked)}
                />
                <span>Mostrar apenas diferenças técnicas</span>
              </label>
            </div>
          )}

          <div className="bg-white border border-black/10 rounded-lg overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 bg-[#17191C] text-white">
                  <th scope="col" className="p-4 text-xs font-semibold uppercase tracking-wider w-48">
                    Especificação
                  </th>
                  {comparedProducts.map((prod) => (
                    <th key={prod.id} scope="col" className="p-4 align-top min-w-[220px]">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="w-20 h-14 rounded overflow-hidden bg-[#202328] shrink-0">
                          <SafeImage
                            src={prod.imageUrl}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCompare(prod.id)}
                          aria-label={`Remover ${prod.name} da comparação`}
                          className="p-1.5 rounded bg-white/10 hover:bg-[#F47721] hover:text-[#17191C] text-white transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-[#FF9147] font-medium">{prod.brand}</p>
                      <p className="font-display text-lg font-semibold text-white leading-snug mt-0.5">
                        {prod.name}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={row.key}
                    className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#F2F2EF]/60'} ${
                      row.hasDifferences ? 'border-l-4 border-l-[#F47721]' : ''
                    }`}
                  >
                    <th
                      scope="row"
                      className="p-4 text-xs font-semibold text-[#17191C] border-b border-black/5 align-top"
                    >
                      {row.label}
                    </th>
                    {row.values.map((val, colIdx) => (
                      <td
                        key={`${row.key}-${colIdx}`}
                        className={`p-4 text-sm border-b border-black/5 align-top tabular-nums ${
                          row.hasDifferences ? 'text-[#17191C] font-medium' : 'text-[#25292D]'
                        }`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Pros */}
                <tr className="bg-white border-b border-black/5">
                  <th scope="row" className="p-4 text-xs font-semibold text-[#17191C] align-top">
                    Principais pontos fortes
                  </th>
                  {comparedProducts.map((prod) => (
                    <td key={`pros-${prod.id}`} className="p-4 text-xs text-[#25292D] align-top">
                      <ul className="space-y-1.5">
                        {prod.pros.slice(0, 3).map((p, i) => (
                          <li key={i}>• {p}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Cons */}
                <tr className="bg-[#F2F2EF]/60 border-b border-black/5">
                  <th scope="row" className="p-4 text-xs font-semibold text-[#17191C] align-top">
                    Limitações / atenção
                  </th>
                  {comparedProducts.map((prod) => (
                    <td key={`cons-${prod.id}`} className="p-4 text-xs text-[#4A4F55] align-top">
                      <ul className="space-y-1.5">
                        {prod.cons.slice(0, 2).map((c, i) => (
                          <li key={i}>• {c}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Target Audience */}
                <tr className="bg-white border-b border-black/5">
                  <th scope="row" className="p-4 text-xs font-semibold text-[#17191C] align-top">
                    Indicado para
                  </th>
                  {comparedProducts.map((prod) => (
                    <td key={`aud-${prod.id}`} className="p-4 text-xs text-[#25292D] align-top leading-relaxed">
                      {prod.targetAudience}
                    </td>
                  ))}
                </tr>

                {/* Actions: Full Analysis + Affiliate Link if available */}
                <tr className="bg-[#F2F2EF]/40">
                  <th scope="row" className="p-4 text-xs font-semibold text-[#17191C] align-middle">
                    Análise e oferta
                  </th>
                  {comparedProducts.map((prod) => {
                    const primaryLink = getPrimaryAffiliateLink(prod);
                    const hasAffiliate = Boolean(primaryLink && isValidAffiliateUrl(primaryLink.url));
                    return (
                      <td key={`cta-${prod.id}`} className="p-4 align-top">
                        <div className="flex flex-col gap-2">
                          <a
                            href={`/produto/${prod.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/produto/${prod.slug}`);
                            }}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-[#17191C] hover:bg-[#202328] text-white text-xs font-bold transition-colors whitespace-nowrap"
                          >
                            <span>Ver análise completa</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                          {hasAffiliate && primaryLink && (
                            <a
                              href={`/go/${encodeURIComponent(prod.slug)}?linkId=${encodeURIComponent(primaryLink.id)}`}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-[#F47721] hover:bg-[#FF9147] text-[#17191C] text-xs font-bold transition-colors whitespace-nowrap"
                            >
                              <span>Ver oferta no Mercado Livre</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
