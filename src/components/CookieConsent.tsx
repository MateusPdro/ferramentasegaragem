import { usePortal } from '../context/PortalContext';

export function CookieConsent() {
  const { showCookieBanner, saveCookiePreference, navigate } = usePortal();

  if (!showCookieBanner) return null;

  return (
    <aside
      aria-label="Preferências de cookies e privacidade"
      className="fixed bottom-0 inset-x-0 z-50 bg-[#17191C] border-t border-white/15 text-white px-4 py-3.5 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-[#A9ADB2] leading-relaxed max-w-3xl">
          Utilizamos armazenamento essencial para o funcionamento do comparador e sessão
          administrativa. Cookies analíticos (Google Analytics 4) só são ativados mediante seu
          consentimento.{' '}
          <a
            href="/privacidade"
            onClick={(e) => {
              e.preventDefault();
              navigate('/privacidade');
            }}
            className="text-[#FF9147] underline hover:text-white"
          >
            Ler Política de Privacidade
          </a>
          .
        </p>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => saveCookiePreference('essential')}
            className="px-3.5 py-2 rounded-md border border-white/20 text-xs font-medium text-white hover:bg-[#202328] transition-colors whitespace-nowrap"
          >
            Apenas essenciais
          </button>
          <button
            type="button"
            onClick={() => saveCookiePreference('all')}
            className="px-4 py-2 rounded-md bg-[#F47721] hover:bg-[#FF9147] text-[#17191C] text-xs font-semibold transition-colors whitespace-nowrap"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </aside>
  );
}
