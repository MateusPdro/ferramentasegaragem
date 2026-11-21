import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { slugify } from '../../lib/catalog';
import type { Category, Product, PublishStatus } from '../../types/index';

const GALLERY_PRESETS = [
  { label: 'Ferramentas elétricas (Oficina)', url: '/src/assets/images/cat_power_tools_1795185272335.jpg' },
  { label: 'Serra mármore e soprador térmico', url: '/src/assets/images/sub_cutter_heatgun_1795188924149.jpg' },
  { label: 'Pistola de pintura e politriz', url: '/src/assets/images/sub_paint_polisher_1795188933133.jpg' },
  { label: 'Chaves combinadas, alicate e martelo', url: '/src/assets/images/sub_wrenches_pliers_hammer_1795188925624.jpg' },
  { label: 'Jogo de soquetes manuais', url: '/src/assets/images/cat_hand_tools_1795185271926.jpg' },
  { label: 'Equipamentos automotivos', url: '/src/assets/images/cat_automotive_gear_1795185272682.jpg' },
  { label: 'Lavadora de alta pressão', url: '/src/assets/images/cat_pressure_washers_1795185272064.jpg' },
  { label: 'Aspiradores e extratoras', url: '/src/assets/images/sub_vacuum_extractor_1795188925389.jpg' },
  { label: 'Análise técnica na bancada', url: '/src/assets/images/editorial_tool_review_1795185271655.jpg' },
];

interface ProductFormModalProps {
  initial: Product | null;
  categories: Category[];
  onClose: () => void;
  onSaved: () => Promise<void>;
}

export function ProductFormModal({ initial, categories, onClose, onSaved }: ProductFormModalProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [brand, setBrand] = useState(initial?.brand ?? '');
  const [model, setModel] = useState(initial?.model ?? '');
  const [categorySlug, setCategorySlug] = useState(
    initial?.categorySlug ?? categories[0]?.slug ?? 'ferramentas-eletricas'
  );
  const [subcategory, setSubcategory] = useState(initial?.subcategory ?? initial?.toolType ?? '');
  const [toolType, setToolType] = useState(initial?.toolType ?? '');
  const [application, setApplication] = useState(initial?.application ?? '');
  const [imageUrl, setImageUrl] = useState(
    initial?.imageUrl ?? '/src/assets/images/cat_power_tools_1795185272335.jpg'
  );
  const [shortDescription, setShortDescription] = useState(initial?.shortDescription ?? '');
  const [introduction, setIntroduction] = useState(initial?.introduction ?? '');
  const [featuresText, setFeaturesText] = useState(initial?.featuresText ?? '');
  const [targetAudience, setTargetAudience] = useState(initial?.targetAudience ?? '');
  const [comparisonNotes, setComparisonNotes] = useState(initial?.comparisonNotes ?? '');
  const [mlReferenceUrl, setMlReferenceUrl] = useState(initial?.mlReferenceUrl ?? '');
  const [ratingInfo, setRatingInfo] = useState(initial?.ratingInfo ?? '');
  const [salesInfo, setSalesInfo] = useState(initial?.salesInfo ?? '');
  const [verifiedAt, setVerifiedAt] = useState(initial?.verifiedAt ?? '2026-11-20');
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [status, setStatus] = useState<PublishStatus>(initial?.status ?? 'published');

  const [specs, setSpecs] = useState({
    potencia: initial?.specs.potencia ?? '',
    voltagem: initial?.specs.voltagem ?? '',
    torque: initial?.specs.torque ?? '',
    rotacao: initial?.specs.rotacao ?? '',
    pressao: initial?.specs.pressao ?? '',
    vazao: initial?.specs.vazao ?? '',
    capacidade: initial?.specs.capacidade ?? '',
    peso: initial?.specs.peso ?? '',
    dimensoes: initial?.specs.dimensoes ?? '',
    acessoriosInclusos: initial?.specs.acessoriosInclusos ?? '',
    garantia: initial?.specs.garantia ?? '',
  });

  const [highlightsText, setHighlightsText] = useState((initial?.highlights ?? []).join('\n'));
  const [prosText, setProsText] = useState((initial?.pros ?? []).join('\n'));
  const [consText, setConsText] = useState((initial?.cons ?? []).join('\n'));

  const [faq, setFaq] = useState(initial?.faq ?? [{ question: '', answer: '' }]);

  const [affiliateLinks, setAffiliateLinks] = useState(
    initial?.affiliateLinks && initial.affiliateLinks.length > 0
      ? initial.affiliateLinks.map((l) => ({
          id: l.id,
          label: l.label,
          marketplace: l.marketplace,
          url: l.url,
          priceBrl: l.priceCents ? (l.priceCents / 100).toFixed(2).replace('.', ',') : '',
          priceUpdatedAt: l.priceUpdatedAt ?? '',
          isPrimary: l.isPrimary,
        }))
      : [
          {
            id: '',
            label: 'Ver oferta no Mercado Livre',
            marketplace: 'Mercado Livre',
            url: '',
            priceBrl: '',
            priceUpdatedAt: '',
            isPrimary: true,
          },
        ]
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const catObj = categories.find((c) => c.slug === categorySlug);
      const parsedLinks = affiliateLinks
        .filter((l) => l.url.trim() || l.priceBrl.trim())
        .map((l, idx) => {
          const cleanPrice = l.priceBrl.replace(/[^\d.,]/g, '').replace(',', '.');
          const numericPrice = cleanPrice ? Number.parseFloat(cleanPrice) : NaN;
          return {
            id: l.id || undefined,
            label: l.label.trim() || 'Ver oferta no Mercado Livre',
            marketplace: l.marketplace.trim() || 'Mercado Livre',
            url: l.url.trim(),
            priceCents: Number.isFinite(numericPrice) && numericPrice > 0 ? Math.round(numericPrice * 100) : null,
            priceUpdatedAt: l.priceUpdatedAt.trim() || null,
            isPrimary: l.isPrimary || idx === 0,
          };
        });

      const payload = {
        id: initial?.id,
        slug: slug.trim() || slugify(name),
        title: title.trim() || `Análise: ${name.trim()}`,
        name: name.trim(),
        brand: brand.trim(),
        model: model.trim() || name.trim(),
        categorySlug,
        subcategory: subcategory.trim() || toolType.trim() || 'Ferramenta',
        toolType: toolType.trim() || subcategory.trim() || 'Ferramenta',
        application: application.trim() || 'Uso geral',
        imageUrl: imageUrl.trim(),
        shortDescription: shortDescription.trim(),
        introduction: introduction.trim(),
        featuresText: featuresText.trim(),
        targetAudience: targetAudience.trim(),
        comparisonNotes: comparisonNotes.trim(),
        mlReferenceUrl: mlReferenceUrl.trim(),
        ratingInfo: ratingInfo.trim(),
        salesInfo: salesInfo.trim(),
        verifiedAt: verifiedAt.trim(),
        featured,
        status,
        specs: {
          marca: brand.trim(),
          modelo: model.trim() || name.trim(),
          categoria: catObj?.name ?? categorySlug,
          ...Object.fromEntries(
            Object.entries(specs).filter(([, v]) => typeof v === 'string' && v.trim().length > 0)
          ),
        },
        highlights: highlightsText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        pros: prosText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        cons: consText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        faq: faq.filter((f) => f.question.trim() && f.answer.trim()),
        affiliateLinks: parsedLinks,
      };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || 'Erro ao salvar produto.');
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
      <div className="bg-white rounded-lg border border-black/15 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        <div className="bg-[#17191C] text-white px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">
            {initial ? `Editar produto: ${initial.name}` : 'Cadastrar novo produto'}
          </h2>
          <button type="button" onClick={onClose} aria-label="Fechar janela" className="text-[#A9ADB2] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-sm">
          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-900 text-xs">
              {error}
            </div>
          )}

          {/* Identificação */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Nome do produto *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!initial) setSlug(slugify(e.target.value));
                }}
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Título editorial (H1)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex.: Análise da Parafusadeira ..."
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Marca *</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Modelo *</label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2"
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
              <label className="block text-xs font-semibold mb-1">Slug da URL amigável</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Subcategoria / Tipo para comparador *</label>
              <input
                type="text"
                list="subcat-suggestions"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                placeholder="Ex.: Serra mármore, Alicates, Scanners automotivos"
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
              <datalist id="subcat-suggestions">
                {(categories.find((c) => c.slug === categorySlug)?.subtopics ?? []).map((t) => (
                  <option key={t} value={t} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Tipo técnico específico</label>
              <input
                type="text"
                value={toolType}
                onChange={(e) => setToolType(e.target.value)}
                placeholder="Ex.: Serra mármore 110 mm"
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Aplicação principal</label>
              <input
                type="text"
                value={application}
                onChange={(e) => setApplication(e.target.value)}
                placeholder="Ex.: Oficina automotiva e montagem"
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Data de verificação</label>
              <input
                type="date"
                value={verifiedAt}
                onChange={(e) => setVerifiedAt(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2 tabular-nums"
              />
            </div>
          </div>

          {/* Referencia Mercado Livre e Sinais Verificados */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F2F2EF]/60 border border-black/10 rounded-md p-3">
            <div>
              <label className="block text-xs font-semibold mb-1">URL de referência Mercado Livre (não afiliado)</label>
              <input
                type="url"
                value={mlReferenceUrl}
                onChange={(e) => setMlReferenceUrl(e.target.value)}
                placeholder="https://lista.mercadolivre.com.br/..."
                className="w-full border border-black/15 rounded-md px-3 py-2 text-xs font-mono bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Sinal de procura / vendas (somente se verificado)</label>
              <input
                type="text"
                value={salesInfo}
                onChange={(e) => setSalesInfo(e.target.value)}
                placeholder="Ex.: Presença recorrente entre mais buscados"
                className="w-full border border-black/15 rounded-md px-3 py-2 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Avaliação verificada (opcional)</label>
              <input
                type="text"
                value={ratingInfo}
                onChange={(e) => setRatingInfo(e.target.value)}
                placeholder="Ex.: Boas avaliações recorrentes"
                className="w-full border border-black/15 rounded-md px-3 py-2 text-xs bg-white"
              />
            </div>
          </div>

          {/* Imagem e Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1">URL ou imagem do acervo</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 border border-black/15 rounded-md px-3 py-2 text-xs font-mono"
                />
                <select
                  aria-label="Selecionar imagem do acervo"
                  onChange={(e) => {
                    if (e.target.value) setImageUrl(e.target.value);
                  }}
                  value=""
                  className="border border-black/15 rounded-md px-2 py-2 text-xs bg-[#F2F2EF]"
                >
                  <option value="">Acervo...</option>
                  {GALLERY_PRESETS.map((g) => (
                    <option key={g.url} value={g.url}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PublishStatus)}
                  className="border border-black/15 rounded-md px-3 py-2 bg-white"
                >
                  <option value="published">Publicado</option>
                  <option value="draft">Rascunho</option>
                </select>
              </div>
              <label className="inline-flex items-center gap-2 text-xs font-semibold pt-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <span>Destaque na Home</span>
              </label>
            </div>
          </div>

          {/* Textos editoriais */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Descrição resumida (card)</label>
              <textarea
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Introdução completa</label>
              <textarea
                rows={3}
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Principais características técnicas</label>
              <textarea
                rows={3}
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Para quem é indicado?</label>
                <textarea
                  rows={2}
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full border border-black/15 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Comparação com concorrentes</label>
                <textarea
                  rows={2}
                  value={comparisonNotes}
                  onChange={(e) => setComparisonNotes(e.target.value)}
                  className="w-full border border-black/15 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Ficha técnica */}
          <div className="border-t border-black/10 pt-4 space-y-3">
            <h3 className="font-display text-lg font-bold text-[#17191C]">
              Ficha técnica (preencha apenas dados confirmados)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(
                [
                  ['potencia', 'Potência'],
                  ['voltagem', 'Voltagem / Bateria'],
                  ['torque', 'Torque'],
                  ['rotacao', 'Rotação (RPM)'],
                  ['pressao', 'Pressão (PSI/bar)'],
                  ['vazao', 'Vazão (L/h)'],
                  ['capacidade', 'Capacidade / Mandril'],
                  ['peso', 'Peso'],
                  ['dimensoes', 'Dimensões'],
                  ['acessoriosInclusos', 'Acessórios inclusos'],
                  ['garantia', 'Garantia'],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-[#4A4F55] mb-1">{label}</label>
                  <input
                    type="text"
                    value={specs[key]}
                    onChange={(e) => setSpecs((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-full border border-black/15 rounded-md px-2.5 py-1.5 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Listas: Destaques, Vantagens, Desvantagens */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-black/10 pt-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Destaques (1 por linha)</label>
              <textarea
                rows={4}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                className="w-full border border-black/15 rounded-md px-2.5 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Vantagens (1 por linha)</label>
              <textarea
                rows={4}
                value={prosText}
                onChange={(e) => setProsText(e.target.value)}
                className="w-full border border-black/15 rounded-md px-2.5 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Desvantagens (1 por linha)</label>
              <textarea
                rows={4}
                value={consText}
                onChange={(e) => setConsText(e.target.value)}
                className="w-full border border-black/15 rounded-md px-2.5 py-2 text-xs"
              />
            </div>
          </div>

          {/* Links de Afiliado Mercado Livre */}
          <div className="border-t border-black/10 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-[#17191C]">
                Links de Afiliados (Mercado Livre)
              </h3>
              <button
                type="button"
                onClick={() =>
                  setAffiliateLinks((prev) => [
                    ...prev,
                    {
                      id: '',
                      label: `Oferta alternativa ${prev.length + 1}`,
                      marketplace: 'Mercado Livre',
                      url: '',
                      priceBrl: '',
                      priceUpdatedAt: '',
                      isPrimary: false,
                    },
                  ])
                }
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#F2F2EF] hover:bg-black/10 text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar outro link</span>
              </button>
            </div>

            <div className="space-y-3">
              {affiliateLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="bg-[#F2F2EF]/80 border border-black/10 rounded-md p-3 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end"
                >
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-semibold mb-1">Rótulo do botão</label>
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) =>
                        setAffiliateLinks((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, label: e.target.value } : item))
                        )
                      }
                      className="w-full border border-black/15 rounded px-2.5 py-1.5 text-xs bg-white"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-semibold mb-1">URL de Afiliado (https://...)</label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) =>
                        setAffiliateLinks((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, url: e.target.value } : item))
                        )
                      }
                      placeholder="https://mercadolivre.com/sec/..."
                      className="w-full border border-black/15 rounded px-2.5 py-1.5 text-xs bg-white font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold mb-1">Preço verificado (R$)</label>
                    <input
                      type="text"
                      value={link.priceBrl}
                      onChange={(e) =>
                        setAffiliateLinks((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, priceBrl: e.target.value } : item))
                        )
                      }
                      placeholder="Ex.: 289,90"
                      className="w-full border border-black/15 rounded px-2.5 py-1.5 text-xs bg-white tabular-nums"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold mb-1">Atualizado em</label>
                    <input
                      type="date"
                      value={link.priceUpdatedAt}
                      onChange={(e) =>
                        setAffiliateLinks((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, priceUpdatedAt: e.target.value } : item
                          )
                        )
                      }
                      className="w-full border border-black/15 rounded px-2 py-1.5 text-xs bg-white tabular-nums"
                    />
                  </div>
                  <div className="sm:col-span-1 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setAffiliateLinks((prev) => prev.filter((_, i) => i !== idx))
                      }
                      aria-label="Remover link"
                      className="p-2 text-red-700 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="border-t border-black/10 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-[#17191C]">Perguntas frequentes</h3>
              <button
                type="button"
                onClick={() => setFaq((prev) => [...prev, { question: '', answer: '' }])}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#F2F2EF] hover:bg-black/10 text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nova pergunta</span>
              </button>
            </div>
            {faq.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-start">
                <input
                  type="text"
                  placeholder="Pergunta"
                  value={item.question}
                  onChange={(e) =>
                    setFaq((prev) =>
                      prev.map((q, i) => (i === idx ? { ...q, question: e.target.value } : q))
                    )
                  }
                  className="sm:col-span-5 border border-black/15 rounded px-2.5 py-1.5 text-xs"
                />
                <input
                  type="text"
                  placeholder="Resposta objetiva"
                  value={item.answer}
                  onChange={(e) =>
                    setFaq((prev) =>
                      prev.map((q, i) => (i === idx ? { ...q, answer: e.target.value } : q))
                    )
                  }
                  className="sm:col-span-6 border border-black/15 rounded px-2.5 py-1.5 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setFaq((prev) => prev.filter((_, i) => i !== idx))}
                  aria-label="Remover pergunta"
                  className="sm:col-span-1 p-1.5 text-red-700 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

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
              {saving ? 'Salvando...' : 'Salvar produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
