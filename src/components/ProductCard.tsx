import { ArrowRight, Check, Scale } from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import {
  formatBrlFromCents,
  getPrimaryAffiliateLink,
  getProductSubcategory,
  getVerifiedPriceCents,
} from '../lib/catalog';
import type { Product } from '../types/index';
import { SafeImage } from './SafeImage';

export function ProductCard({ product }: { product: Product }) {
  const { categories, navigate, compareIds, toggleCompare } = usePortal();
  const category = categories.find((c) => c.slug === product.categorySlug);
  const isCompared = compareIds.includes(product.id);
  const primaryLink = getPrimaryAffiliateLink(product);
  const priceText = formatBrlFromCents(getVerifiedPriceCents(product));
  const subcat = getProductSubcategory(product);

  return (
    <article className="bg-white border border-black/10 rounded-lg overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5 hover:border-black/20">
      <a
        href={`/produto/${product.slug}`}
        onClick={(e) => {
          e.preventDefault();
          navigate(`/produto/${product.slug}`);
        }}
        className="block aspect-[4/3] bg-[#202328] overflow-hidden"
      >
        <SafeImage
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </a>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-[#60656C] font-medium mb-1.5">
          <span>{product.brand}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{category?.name ?? product.specs.categoria}</span>
        </div>

        <h3 className="font-display text-xl font-semibold text-[#17191C] leading-snug mb-2">
          <a
            href={`/produto/${product.slug}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/produto/${product.slug}`);
            }}
            className="hover:text-[#F47721] transition-colors"
          >
            {product.name}
          </a>
        </h3>

        <p className="text-sm text-[#4A4F55] leading-relaxed mb-4 line-clamp-3">
          {product.shortDescription}
        </p>

        {product.highlights.length > 0 && (
          <ul className="space-y-1.5 mb-5 text-xs text-[#25292D] border-t border-black/5 pt-3">
            {product.highlights.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#F47721] font-bold leading-4" aria-hidden="true">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-3 border-t border-black/10 space-y-3">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-[#60656C] truncate">{subcat}</span>
            <span className="font-mono font-semibold text-[#17191C] tabular-nums shrink-0">
              {priceText ? priceText : primaryLink?.url ? 'Oferta disponível' : 'Análise técnica'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`/produto/${product.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/produto/${product.slug}`);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-md bg-[#17191C] hover:bg-[#F47721] hover:text-[#17191C] text-white text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <span>Ver análise completa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => toggleCompare(product.id)}
              aria-pressed={isCompared}
              aria-label={
                isCompared
                  ? `Remover ${product.name} do comparador`
                  : `Adicionar ${product.name} ao comparador`
              }
              className={`inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-md border text-xs font-medium transition-colors whitespace-nowrap ${
                isCompared
                  ? 'bg-[#F47721]/15 border-[#F47721] text-[#17191C]'
                  : 'bg-white border-black/15 text-[#25292D] hover:border-[#17191C]'
              }`}
            >
              {isCompared ? <Check className="w-3.5 h-3.5 text-[#F47721]" /> : <Scale className="w-3.5 h-3.5" />}
              <span>{isCompared ? 'No comparador' : 'Comparar'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
