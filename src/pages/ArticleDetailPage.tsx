import { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { SafeImage } from '../components/SafeImage';
import { usePortal } from '../context/PortalContext';
import { applyPageSeo, buildArticleJsonLd } from '../lib/seo';

function renderArticleBody(content: string, onNavigate: (path: string) => void) {
  const blocks = content.split(/\n\n+/);
  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={idx} className="font-display text-2xl font-bold text-[#17191C] pt-4">
          {trimmed.replace(/^##\s+/, '')}
        </h2>
      );
    }

    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={idx} className="font-display text-xl font-semibold text-[#17191C] pt-2">
          {trimmed.replace(/^###\s+/, '')}
        </h3>
      );
    }

    const lines = trimmed.split('\n');
    const isBulletList = lines.every((l) => l.trim().startsWith('- '));
    if (isBulletList) {
      return (
        <ul key={idx} className="space-y-2 pl-5 list-disc text-[#25292D]">
          {lines.map((line, i) => (
            <li key={i} className="text-base leading-relaxed">
              {renderInlineFormatting(line.trim().replace(/^-\s+/, ''), onNavigate)}
            </li>
          ))}
        </ul>
      );
    }

    const isOrderedList = lines.every((l) => /^\d+\.\s+/.test(l.trim()));
    if (isOrderedList) {
      return (
        <ol key={idx} className="space-y-2 pl-5 list-decimal text-[#25292D]">
          {lines.map((line, i) => (
            <li key={i} className="text-base leading-relaxed">
              {renderInlineFormatting(line.trim().replace(/^\d+\.\s+/, ''), onNavigate)}
            </li>
          ))}
        </ol>
      );
    }

    return (
      <p key={idx} className="text-base text-[#25292D] leading-relaxed">
        {renderInlineFormatting(trimmed, onNavigate)}
      </p>
    );
  });
}

function renderInlineFormatting(text: string, onNavigate: (path: string) => void) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      if (href.startsWith('/')) {
        return (
          <a
            key={i}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(href);
            }}
            className="font-semibold text-[#C85609] underline decoration-[#F47721]/60 underline-offset-2 hover:text-[#17191C]"
          >
            {label}
          </a>
        );
      }
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#C85609] underline underline-offset-2 hover:text-[#17191C]"
        >
          {label}
        </a>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#17191C]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="font-mono text-sm bg-[#F2F2EF] px-1.5 py-0.5 rounded text-[#17191C]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function ArticleDetailPage({ slug }: { slug: string }) {
  const { articles, categories, products, navigate } = usePortal();
  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    if (article) {
      applyPageSeo({
        title: article.title,
        description: article.summary,
        path: `/artigo/${article.slug}`,
        type: 'article',
        jsonLd: buildArticleJsonLd(article, window.location.origin),
      });
    }
  }, [article]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
        <h1 className="font-display text-3xl font-bold text-[#17191C]">Artigo não encontrado</h1>
        <button
          type="button"
          onClick={() => navigate('/guias')}
          className="px-5 py-2.5 rounded-md bg-[#F47721] text-[#17191C] text-sm font-bold"
        >
          Ver todos os guias
        </button>
      </div>
    );
  }

  const category = categories.find((c) => c.slug === article.categorySlug);
  const relatedProducts = products.filter(
    (p) =>
      article.relatedProductSlugs.includes(p.slug) ||
      (article.relatedProductSlugs.length === 0 && p.categorySlug === article.categorySlug)
  );

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs
        items={[
          { label: 'Guias de Compra', path: '/guias' },
          { label: article.title },
        ]}
      />

      <header className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#60656C] font-medium">
          <span className="text-[#F47721] font-semibold">
            {article.articleType === 'comparativo' ? 'Comparativo Técnico' : 'Guia de Compra'}
          </span>
          <span aria-hidden="true">·</span>
          <span>{category?.name ?? article.categorySlug}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readMinutes} min de leitura</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17191C] leading-tight">
          {article.title}
        </h1>

        <p className="text-lg text-[#4A4F55] leading-relaxed">{article.summary}</p>
      </header>

      <div className="aspect-[16/9] rounded-lg overflow-hidden bg-[#202328] mb-8 border border-black/10">
        <SafeImage
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white border border-black/10 rounded-lg p-6 sm:p-10 space-y-5">
        {renderArticleBody(article.content, navigate)}
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-14 pt-10 border-t border-black/10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#17191C] mb-6">
            Produtos mencionados e relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProducts.slice(0, 4).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
