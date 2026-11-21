import { useEffect } from 'react';
import { Check, ExternalLink, Info, Minus, Scale, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { SafeImage } from '../components/SafeImage';
import { usePortal } from '../context/PortalContext';
import {
  formatBrlFromCents,
  getPrimaryAffiliateLink,
  getProductSubcategory,
  isValidAffiliateUrl,
  normalizeText,
} from '../lib/catalog';
import { applyPageSeo, buildProductJsonLd } from '../lib/seo';

const SPEC_LABELS: Array<{ key: string; label: string }> = [
  { key: 'marca', label: 'Marca' },
  { key: 'modelo', label: 'Modelo' },
  { key: 'categoria', label: 'Categoria' },
  { key: 'potencia', label: 'Potência' },
  { key: 'voltagem', label: 'Voltagem / Alimentação' },
  { key: 'torque', label: 'Torque' },
  { key: 'rotacao', label: 'Rotação' },
  { key: 'pressao', label: 'Pressão' },
  { key: 'vazao', label: 'Vazão' },
  { key: 'capacidade', label: 'Capacidade' },
  { key: 'peso', label: 'Peso' },
  { key: 'dimensoes', label: 'Dimensões' },
  { key: 'acessoriosInclusos', label: 'Acessórios inclusos' },
  { key: 'garantia', label: 'Garantia' },
];

export function ProductDetailPage({ slug }: { slug: string }) {
  const { products, categories, articles, navigate, compareIds, toggleCompare, adminUser } = usePortal();
  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    if (product) {
      applyPageSeo({
        title: product.title,
        description: product.shortDescription,
        path: `/produto/${product.slug}`,
        jsonLd: buildProductJsonLd(product, window.location.origin),
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
        <h1 className="font-display text-3xl font-bold text-[#17191C]">Análise não encontrada</h1>
        <p className="text-sm text-[#4A4F55]">
          O produto solicitado não está publicado ou foi movido.
        </p>
        <button
          type="button"
          onClick={() => navigate('/ferramentas')}
          className="px-5 py-2.5 rounded-md bg-[#F47721] text-[#17191C] text-sm font-bold"
        >
          Explorar ferramentas
        </button>
      </div>
    );
  }

  const category = categories.find((c) => c.slug === product.categorySlug);
  const subcat = getProductSubcategory(product);
  const sameSubProducts = products.filter(
    (p) => p.id !== product.id && normalizeText(getProductSubcategory(p)) === normalizeText(subcat)
  );
  const otherCategoryProducts = products.filter(
    (p) =>
      p.id !== product.id &&
      p.categorySlug === product.categorySlug &&
      normalizeText(getProductSubcategory(p)) !== normalizeText(subcat)
  );
  const relatedProducts = [...sameSubProducts, ...otherCategoryProducts].slice(0, 3);

  const relatedArticles = articles
    .filter(
      (a) =>
        a.relatedProductSlugs.includes(product.slug) || a.categorySlug === product.categorySlug
    )
    .slice(0, 2);

  const primaryLink = getPrimaryAffiliateLink(product);
  const validLinks = product.affiliateLinks.filter((l) => isValidAffiliateUrl(l.url));
  const verifiedPrice = formatBrlFromCents(primaryLink?.priceCents);
  const isCompared = compareIds.includes(product.id);
  const hasMlReference = Boolean(product.mlReferenceUrl && isValidAffiliateUrl(product.mlReferenceUrl));

  const specRows = SPEC_LABELS.map((item) => ({
    label: item.label,
    value: product.specs[item.key],
  })).filter((row) => typeof row.value === 'string' && row.value.trim().length > 0);

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs
        items={[
          { label: category?.name ?? product.specs.categoria, path: `/categoria/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      {/* 1. Título e 2. Introdução */}
      <header className="mb-8 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#60656C] font-medium mb-2">
          <span>{product.brand}</span>
          <span aria-hidden="true">·</span>
          <span>{subcat}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            {product.verifiedAt
              ? `Verificado em ${new Date(`${product.verifiedAt}T12:00:00`).toLocaleDateString('pt-BR')}`
              : `Atualizado em ${new Date(product.updatedAt).toLocaleDateString('pt-BR')}`}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17191C] leading-tight">
          {product.title}
        </h1>

        <p className="text-base sm:text-lg text-[#25292D] leading-relaxed mt-4">
          {product.introduction}
        </p>

        {(product.salesInfo || product.ratingInfo) && (
          <p className="text-xs text-[#4A4F55] mt-3 bg-white border border-black/10 rounded-md px-3.5 py-2 inline-block">
            {[product.salesInfo, product.ratingInfo].filter(Boolean).join(' · ')}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna principal editorial */}
        <div className="lg:col-span-8 space-y-10">
          {/* 3. Imagem principal */}
          <div className="bg-white border border-black/10 rounded-lg overflow-hidden">
            <div className="aspect-[4/3] bg-[#202328]">
              <SafeImage
                src={product.imageUrl}
                alt={`${product.name} - fotografia de referência`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 4. Ficha técnica */}
          <section aria-labelledby="ficha-tecnica-heading">
            <h2
              id="ficha-tecnica-heading"
              className="font-display text-2xl font-bold text-[#17191C] mb-4"
            >
              Ficha técnica confirmada
            </h2>
            <div className="bg-white border border-black/10 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left border-collapse">
                <tbody>
                  {specRows.map((row, idx) => (
                    <tr
                      key={row.label}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F2F2EF]/60'}
                    >
                      <th
                        scope="row"
                        className="py-3 px-4 font-semibold text-[#17191C] w-2/5 border-b border-black/5 align-top"
                      >
                        {row.label}
                      </th>
                      <td className="py-3 px-4 text-[#25292D] border-b border-black/5 tabular-nums">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Principais características */}
          <section aria-labelledby="caracteristicas-heading" className="space-y-4">
            <h2
              id="caracteristicas-heading"
              className="font-display text-2xl font-bold text-[#17191C]"
            >
              Principais características e aplicação prática
            </h2>
            <div className="bg-white border border-black/10 rounded-lg p-6 space-y-4">
              <p className="text-sm sm:text-base text-[#25292D] leading-relaxed">
                {product.featuresText}
              </p>
              {product.highlights.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-black/10">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#17191C]">
                      <Check className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* 6. Vantagens e 7. Desvantagens */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-black/10 rounded-lg p-6">
              <h2 className="font-display text-xl font-bold text-[#17191C] mb-4">
                Vantagens identificadas
              </h2>
              <ul className="space-y-2.5 text-sm text-[#25292D]">
                {product.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-black/10 rounded-lg p-6">
              <h2 className="font-display text-xl font-bold text-[#17191C] mb-4">
                Desvantagens e limitações reais
              </h2>
              <ul className="space-y-2.5 text-sm text-[#25292D]">
                {product.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Minus className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 8. Para quem é indicado? */}
          <section className="bg-white border border-black/10 rounded-lg p-6 space-y-2">
            <h2 className="font-display text-2xl font-bold text-[#17191C]">
              Para quem este equipamento é indicado?
            </h2>
            <p className="text-sm sm:text-base text-[#25292D] leading-relaxed">
              {product.targetAudience}
            </p>
          </section>

          {/* 9. Comparação */}
          {product.comparisonNotes && (
            <section className="bg-[#202328] text-white rounded-lg p-6 space-y-3">
              <h2 className="font-display text-2xl font-bold text-white">
                Comparação com concorrentes da categoria
              </h2>
              <p className="text-sm sm:text-base text-[#D4D7DC] leading-relaxed">
                {product.comparisonNotes}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!isCompared) toggleCompare(product.id);
                    navigate('/comparativos');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#F47721] hover:bg-[#FF9147] text-[#17191C] text-xs font-bold transition-colors"
                >
                  <Scale className="w-4 h-4" />
                  <span>Comparar lado a lado no comparador</span>
                </button>
              </div>
            </section>
          )}

          {/* 11. Perguntas frequentes */}
          {product.faq.length > 0 && (
            <section aria-labelledby="faq-heading" className="space-y-4">
              <h2 id="faq-heading" className="font-display text-2xl font-bold text-[#17191C]">
                Perguntas frequentes
              </h2>
              <div className="space-y-3">
                {product.faq.map((item, i) => (
                  <details
                    key={i}
                    className="bg-white border border-black/10 rounded-lg p-5 group"
                    open={i === 0}
                  >
                    <summary className="font-semibold text-sm sm:text-base text-[#17191C] cursor-pointer list-none flex items-center justify-between gap-4">
                      <span>{item.question}</span>
                      <span className="text-[#F47721] text-lg font-bold group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="text-sm text-[#4A4F55] leading-relaxed mt-3 pt-3 border-t border-black/5">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Coluna lateral: 10. Card de Oferta + 13. Aviso de Afiliados */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          <div className="bg-white border border-black/15 rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-black/10">
              <div className="w-16 h-16 rounded bg-[#202328] overflow-hidden shrink-0">
                <SafeImage
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-[#60656C] font-medium">{product.brand}</p>
                <h2 className="font-display text-lg font-bold text-[#17191C] leading-snug">
                  {product.name}
                </h2>
              </div>
            </div>

            {verifiedPrice ? (
              <div className="space-y-1">
                <p className="text-xs text-[#60656C]">Preço verificado cadastrado</p>
                <p className="font-mono text-2xl font-bold text-[#17191C] tabular-nums">
                  {verifiedPrice}
                </p>
                {primaryLink?.priceUpdatedAt && (
                  <p className="text-xs text-[#60656C] tabular-nums">
                    Última atualização: {primaryLink.priceUpdatedAt}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-xs text-[#4A4F55] bg-[#F2F2EF] rounded-md p-3">
                Preço não fixado nesta ficha: confira o valor atualizado e condições de frete
                diretamente na oferta do vendedor.
              </div>
            )}

            {validLinks.length > 0 ? (
              <div className="space-y-2.5">
                {validLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`/go/${encodeURIComponent(product.slug)}?linkId=${encodeURIComponent(link.id)}`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-bold transition-colors ${
                      link.isPrimary
                        ? 'bg-[#F47721] hover:bg-[#FF9147] text-[#17191C]'
                        : 'bg-[#17191C] hover:bg-[#202328] text-white'
                    }`}
                  >
                    <span>
                      {link.label && link.label !== 'Oferta principal'
                        ? link.label
                        : 'Ver oferta no Mercado Livre'}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex items-start gap-2 text-xs text-[#4A4F55] bg-[#F2F2EF] border border-black/10 rounded-md p-3">
                  <Info className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
                  <span>
                    Link de afiliado ainda não vinculado pelo editor. Utilize a ficha técnica e o
                    comparador para avaliar modelos equivalentes.
                  </span>
                </div>
                {hasMlReference && product.mlReferenceUrl && (
                  <a
                    href={product.mlReferenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-black/15 bg-white hover:border-[#F47721] text-xs font-semibold text-[#17191C] transition-colors"
                  >
                    <span>Referência de busca no Mercado Livre</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {adminUser && (
                  <button
                    type="button"
                    onClick={() => navigate('/admin')}
                    className="w-full px-4 py-2.5 rounded-md border border-black/15 text-xs font-semibold text-[#17191C] hover:border-[#F47721] transition-colors"
                  >
                    Cadastrar link de afiliado no Admin
                  </button>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => toggleCompare(product.id)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-black/15 text-xs font-semibold text-[#17191C] hover:bg-[#F2F2EF] transition-colors"
            >
              <Scale className="w-3.5 h-3.5 text-[#F47721]" />
              <span>{isCompared ? 'Remover do comparador' : 'Adicionar ao comparador'}</span>
            </button>
          </div>

          {/* 13. Aviso de afiliados */}
          <div className="bg-[#17191C] text-[#A9ADB2] rounded-lg p-5 space-y-2 text-xs leading-relaxed">
            <div className="flex items-center gap-2 text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#F47721]" />
              <span>Transparência e Programa de Afiliados</span>
            </div>
            <p>
              Este site participa de programas de afiliados. Podemos receber uma comissão por compras
              realizadas por meio de determinados links, sem custo adicional para você. Nossa
              proposta é oferecer informações úteis e análises independentes para ajudar na sua
              decisão de compra.
            </p>
          </div>

          {relatedArticles.length > 0 && (
            <div className="bg-white border border-black/10 rounded-lg p-5 space-y-3">
              <h3 className="font-display text-lg font-bold text-[#17191C]">
                Guias recomendados
              </h3>
              <ul className="space-y-2.5">
                {relatedArticles.map((art) => (
                  <li key={art.id}>
                    <a
                      href={`/artigo/${art.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/artigo/${art.slug}`);
                      }}
                      className="text-sm font-medium text-[#25292D] hover:text-[#F47721] transition-colors block"
                    >
                      {art.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* 12. Produtos relacionados */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-black/10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#17191C] mb-6">
            Produtos relacionados em {category?.name ?? product.specs.categoria}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
