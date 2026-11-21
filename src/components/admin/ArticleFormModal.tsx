import React, { useState } from 'react';
import { X } from 'lucide-react';
import { slugify } from '../../lib/catalog';
import type { Article, Category, Product, PublishStatus } from '../../types/index';

interface ArticleFormModalProps {
  initial: Article | null;
  categories: Category[];
  products: Product[];
  onClose: () => void;
  onSaved: () => Promise<void>;
}

export function ArticleFormModal({
  initial,
  categories,
  products,
  onClose,
  onSaved,
}: ArticleFormModalProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [categorySlug, setCategorySlug] = useState(
    initial?.categorySlug ?? categories[0]?.slug ?? 'ferramentas-eletricas'
  );
  const [articleType, setArticleType] = useState<'guia' | 'comparativo'>(
    initial?.articleType ?? 'guia'
  );
  const [summary, setSummary] = useState(initial?.summary ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [imageUrl, setImageUrl] = useState(
    initial?.imageUrl ?? '/src/assets/images/editorial_tool_review_1795185271655.jpg'
  );
  const [keywordsText, setKeywordsText] = useState((initial?.keywords ?? []).join(', '));
  const [readMinutes, setReadMinutes] = useState(initial?.readMinutes ?? 5);
  const [relatedSlugs, setRelatedSlugs] = useState<string[]>(initial?.relatedProductSlugs ?? []);
  const [status, setStatus] = useState<PublishStatus>(initial?.status ?? 'published');
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleRelatedSlug = (prodSlug: string) => {
    setRelatedSlugs((prev) =>
      prev.includes(prodSlug) ? prev.filter((s) => s !== prodSlug) : [...prev, prodSlug]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: initial?.id,
          title: title.trim(),
          slug: slug.trim() || slugify(title),
          categorySlug,
          articleType,
          summary: summary.trim(),
          content: content.trim(),
          imageUrl: imageUrl.trim(),
          keywords: keywordsText
            .split(',')
            .map((k) => k.trim())
            .filter(Boolean),
          readMinutes: Number(readMinutes) || 5,
          relatedProductSlugs: relatedSlugs,
          featured,
          status,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || 'Erro ao salvar artigo.');
      await onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg border border-black/15 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        <div className="bg-[#17191C] text-white px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">
            {initial ? `Editar artigo: ${initial.title}` : 'Escrever novo artigo'}
          </h2>
          <button type="button" onClick={onClose} aria-label="Fechar janela" className="text-[#A9ADB2] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm">
          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-900 text-xs">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1">Título do artigo *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!initial) setSlug(slugify(e.target.value));
                }}
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Slug da URL</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Categoria *</label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Formato</label>
              <select
                value={articleType}
                onChange={(e) => setArticleType(e.target.value as 'guia' | 'comparativo')}
                className="w-full border border-black/15 rounded-md px-3 py-2 bg-white"
              >
                <option value="guia">Guia de Compra</option>
                <option value="comparativo">Comparativo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PublishStatus)}
                className="w-full border border-black/15 rounded-md px-3 py-2 bg-white"
              >
                <option value="published">Publicado</option>
                <option value="draft">Rascunho</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">URL da imagem</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Tempo de leitura (min)</label>
              <input
                type="number"
                min={1}
                max={60}
                value={readMinutes}
                onChange={(e) => setReadMinutes(Number(e.target.value))}
                className="w-full border border-black/15 rounded-md px-3 py-2 tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Resumo / Meta description</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full border border-black/15 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Conteúdo editorial (suporta subtítulos ##, ### e listas -) *
            </label>
            <textarea
              required
              rows={9}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-black/15 rounded-md px-3 py-2 font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Palavras-chave SEO (separadas por vírgula)
            </label>
            <input
              type="text"
              value={keywordsText}
              onChange={(e) => setKeywordsText(e.target.value)}
              className="w-full border border-black/15 rounded-md px-3 py-2 text-xs"
            />
          </div>

          <div>
            <span className="block text-xs font-semibold mb-1.5">Produtos relacionados (links internos)</span>
            <div className="max-h-32 overflow-y-auto border border-black/10 rounded-md p-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {products.map((p) => (
                <label key={p.id} className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={relatedSlugs.includes(p.slug)}
                    onChange={() => toggleRelatedSlug(p.slug)}
                  />
                  <span className="truncate">{p.name}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <span>Destacar artigo</span>
          </label>

          <div className="pt-4 border-t border-black/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-black/15 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-md bg-[#F47721] hover:bg-[#FF9147] text-[#17191C] text-xs font-bold disabled:opacity-60"
            >
              {saving ? 'Salvando...' : 'Salvar artigo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
