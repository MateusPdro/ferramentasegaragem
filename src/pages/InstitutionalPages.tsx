import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePortal } from '../context/PortalContext';
import { applyPageSeo } from '../lib/seo';

export function AboutPage() {
  const { navigate } = usePortal();
  useEffect(() => {
    applyPageSeo({
      title: 'Sobre o Ferramentas & Garagem',
      description:
        'Conheça a missão, metodologia editorial e compromisso de imparcialidade do portal Ferramentas & Garagem.',
      path: '/sobre',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Sobre o projeto' }]} />
      <div className="bg-white border border-black/10 rounded-lg p-6 sm:p-10 space-y-5">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#17191C]">
          Sobre o Ferramentas &amp; Garagem
        </h1>
        <p className="text-base text-[#25292D] leading-relaxed">
          <strong>Escolha certo. Trabalhe melhor.</strong> O Ferramentas &amp; Garagem nasceu para
          preencher uma lacuna comum no mercado brasileiro: separar especificações técnicas reais de
          promessas comerciais exageradas na hora de escolher ferramentas elétricas, manuais e
          equipamentos automotivos.
        </p>
        <h2 className="font-display text-2xl font-bold text-[#17191C] pt-2">
          Nossa metodologia editorial
        </h2>
        <ul className="space-y-2.5 list-disc pl-5 text-sm sm:text-base text-[#25292D] leading-relaxed">
          <li>
            <strong>Verificação de fichas técnicas:</strong> consultamos manuais e catálogos de
            fabricantes antes de publicar qualquer valor de torque, potência, pressão ou vazão.
            Quando uma informação não é confirmada oficialmente, exibimos &ldquo;Não informado&rdquo;.
          </li>
          <li>
            <strong>Indicação honesta de público:</strong> explicamos claramente quando uma
            ferramenta atende uso doméstico ocasional e quando o serviço exige linha profissional.
          </li>
          <li>
            <strong>Transparência comercial:</strong> nenhuma marca paga para receber recomendações
            artificiais, e não publicamos avaliações ou notas fictícias.
          </li>
        </ul>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => navigate('/ferramentas')}
            className="px-5 py-2.5 rounded-md bg-[#F47721] hover:bg-[#FF9147] text-[#17191C] text-sm font-bold transition-colors"
          >
            Explorar análises publicadas
          </button>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );

  useEffect(() => {
    applyPageSeo({
      title: 'Contato Editorial',
      description:
        'Envie sugestões de pautas, correções técnicas ou dúvidas sobre análises para a equipe do Ferramentas & Garagem.',
      path: '/contato',
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || 'Erro ao enviar mensagem.');
      setStatusMessage({
        type: 'ok',
        text: 'Mensagem registrada com sucesso. Obrigado pelo contato com nossa equipe editorial.',
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setStatusMessage({
        type: 'err',
        text: err instanceof Error ? err.message : 'Erro ao enviar mensagem.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <Breadcrumbs items={[{ label: 'Contato' }]} />
      <div className="bg-white border border-black/10 rounded-lg p-6 sm:p-10 space-y-6">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#17191C]">
            Contato Editorial
          </h1>
          <p className="text-sm text-[#4A4F55] mt-2">
            Sugira ferramentas para análise, reporte atualizações técnicas ou tire dúvidas sobre o
            portal.
          </p>
        </div>

        {statusMessage && (
          <div
            role="status"
            className={`p-4 rounded-md text-sm flex items-start gap-2.5 ${
              statusMessage.type === 'ok'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                : 'bg-red-50 border border-red-200 text-red-900'
            }`}
          >
            {statusMessage.type === 'ok' && <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="c-name" className="block text-xs font-semibold text-[#17191C] mb-1">
                Nome completo
              </label>
              <input
                id="c-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="c-email" className="block text-xs font-semibold text-[#17191C] mb-1">
                E-mail
              </label>
              <input
                id="c-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-black/15 rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="c-subject" className="block text-xs font-semibold text-[#17191C] mb-1">
              Assunto
            </label>
            <input
              id="c-subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-black/15 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="c-msg" className="block text-xs font-semibold text-[#17191C] mb-1">
              Mensagem
            </label>
            <textarea
              id="c-msg"
              required
              minLength={10}
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-black/15 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-md bg-[#F47721] hover:bg-[#FF9147] text-[#17191C] text-sm font-bold transition-colors disabled:opacity-60"
          >
            {submitting ? 'Enviando...' : 'Enviar mensagem'}
          </button>
        </form>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  const { openCookiePreferences } = usePortal();

  useEffect(() => {
    applyPageSeo({
      title: 'Política de Privacidade e LGPD',
      description:
        'Saiba quais dados são tratados pelo Ferramentas & Garagem, uso de cookies e como exercer seus direitos previstos na LGPD.',
      path: '/privacidade',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <Breadcrumbs items={[{ label: 'Política de Privacidade' }]} />
      <div className="bg-white border border-black/10 rounded-lg p-6 sm:p-10 space-y-5 text-sm sm:text-base text-[#25292D] leading-relaxed">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#17191C]">
          Política de Privacidade e Proteção de Dados (LGPD)
        </h1>
        <p>
          O portal <strong>Ferramentas &amp; Garagem</strong> respeita a privacidade dos visitantes e
          adota práticas alinhadas à Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).
        </p>

        <h2 className="font-display text-xl font-bold text-[#17191C] pt-2">
          1. Quais dados coletamos e por quê
        </h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Formulário de contato:</strong> armazenamos nome, e-mail, assunto e mensagem
            enviados voluntariamente para responder à sua solicitação.
          </li>
          <li>
            <strong>Armazenamento local essencial:</strong> guardamos no navegador sua seleção do
            comparador de produtos e sua escolha de consentimento de cookies.
          </li>
          <li>
            <strong>Registro técnico de cliques em ofertas:</strong> quando você clica em um link de
            afiliado, registramos data/hora e identificador do produto para fins estatísticos de
            desempenho editorial, sem identificar o visitante nominalmente.
          </li>
        </ul>

        <h2 className="font-display text-xl font-bold text-[#17191C] pt-2">
          2. Cookies e medição de audiência (Google Analytics 4)
        </h2>
        <p>
          Scripts de análise de tráfego como o Google Analytics 4 (quando configurado pelo
          administrador) só são carregados após o seu consentimento explícito na barra de cookies.
        </p>
        <div>
          <button
            type="button"
            onClick={openCookiePreferences}
            className="px-4 py-2 rounded-md bg-[#17191C] text-white text-xs font-semibold hover:bg-[#F47721] hover:text-[#17191C] transition-colors"
          >
            Alterar preferências de cookies agora
          </button>
        </div>

        <h2 className="font-display text-xl font-bold text-[#17191C] pt-2">
          3. Direitos do titular dos dados
        </h2>
        <p>
          Você pode solicitar confirmação de tratamento, acesso, correção ou eliminação de dados
          pessoais enviados pelo formulário utilizando nossa página de Contato Editorial.
        </p>
      </div>
    </div>
  );
}

export function AffiliatesPolicyPage() {
  useEffect(() => {
    applyPageSeo({
      title: 'Política de Afiliados',
      description:
        'Transparência sobre a participação do Ferramentas & Garagem no Programa de Afiliados do Mercado Livre.',
      path: '/afiliados',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <Breadcrumbs items={[{ label: 'Política de Afiliados' }]} />
      <div className="bg-white border border-black/10 rounded-lg p-6 sm:p-10 space-y-5 text-sm sm:text-base text-[#25292D] leading-relaxed">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#17191C]">
          Política de Afiliados e Transparência
        </h1>
        <p className="bg-[#F2F2EF] border border-black/10 rounded-md p-4 font-medium text-[#17191C]">
          Este site participa de programas de afiliados. Podemos receber uma comissão por compras
          realizadas por meio de determinados links, sem custo adicional para você. Nossa proposta é
          oferecer informações úteis e análises independentes para ajudar na sua decisão de compra.
        </p>
        <p>
          O <strong>Ferramentas &amp; Garagem</strong> utiliza links de indicação vinculados ao{' '}
          <strong>Programa de Afiliados do Mercado Livre</strong> e eventuais parceiros
          autorizados. Quando você acessa uma oferta por meio dos botões &ldquo;Ver oferta no
          Mercado Livre&rdquo; e conclui uma aquisição na plataforma parceira, o portal pode receber
          uma comissão que ajuda a financiar a produção contínua de guias técnicos.
        </p>
        <h2 className="font-display text-xl font-bold text-[#17191C] pt-2">
          Preços, estoque e responsabilidade pela venda
        </h2>
        <p>
          Não realizamos venda direta, cobrança, entrega ou intermediação financeira. Preços,
          prazos de envio, disponibilidade de estoque, voltagem e garantia comercial são definidos
          exclusivamente pelo vendedor e pela plataforma de destino no momento da compra.
        </p>
      </div>
    </div>
  );
}

export function TermsPage() {
  useEffect(() => {
    applyPageSeo({
      title: 'Termos de Uso',
      description: 'Condições de uso do conteúdo técnico e comparativos do Ferramentas & Garagem.',
      path: '/termos',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <Breadcrumbs items={[{ label: 'Termos de Uso' }]} />
      <div className="bg-white border border-black/10 rounded-lg p-6 sm:p-10 space-y-5 text-sm sm:text-base text-[#25292D] leading-relaxed">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#17191C]">Termos de Uso</h1>
        <p>
          Ao navegar pelo <strong>Ferramentas &amp; Garagem</strong>, você concorda que todo o
          conteúdo publicado possui caráter informativo e educativo.
        </p>
        <h2 className="font-display text-xl font-bold text-[#17191C] pt-2">
          Segurança no uso de ferramentas
        </h2>
        <p>
          Sempre leia o manual oficial do fabricante, respeite a tensão elétrica correta (127V,
          220V ou bivolt) e utilize Equipamentos de Proteção Individual (EPIs) adequados — como
          óculos de proteção, luvas, protetor auricular e cavaletes mecânicos ao trabalhar sob
          veículos.
        </p>
        <h2 className="font-display text-xl font-bold text-[#17191C] pt-2">
          Atualizações técnicas
        </h2>
        <p>
          Fabricantes podem alterar acessórios inclusos, especificações ou versões de modelos sem
          aviso prévio. Confira sempre os detalhes finais na página do vendedor antes da compra.
        </p>
      </div>
    </div>
  );
}
