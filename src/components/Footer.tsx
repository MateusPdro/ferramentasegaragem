import { usePortal } from '../context/PortalContext';
import { Logo } from './Logo';

export function Footer() {
  const { categories, navigate, openCookiePreferences } = usePortal();

  const linkHandler = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="bg-[#17191C] text-[#A9ADB2] border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-5 space-y-4">
            <Logo />
            <p className="text-sm leading-relaxed text-[#A9ADB2] max-w-md">
              Escolha certo. Trabalhe melhor. Portal editorial independente dedicado a análises
              técnicas, comparativos e guias práticos de ferramentas elétricas, manuais e
              equipamentos automotivos.
            </p>
            <p className="text-xs leading-relaxed text-[#A9ADB2]/80 max-w-md">
              Aviso de afiliados: Este site participa de programas de afiliados. Podemos receber uma
              comissão por compras realizadas por meio de determinados links, sem custo adicional
              para você.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Categorias
            </h3>
            <ul className="space-y-2 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`/categoria/${cat.slug}`}
                    onClick={linkHandler(`/categoria/${cat.slug}`)}
                    className="hover:text-[#FF9147] transition-colors"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/comparativos"
                  onClick={linkHandler('/comparativos')}
                  className="hover:text-[#FF9147] transition-colors"
                >
                  Comparador de Produtos
                </a>
              </li>
              <li>
                <a
                  href="/guias"
                  onClick={linkHandler('/guias')}
                  className="hover:text-[#FF9147] transition-colors"
                >
                  Guias de Compra
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Institucional e Transparência
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/sobre" onClick={linkHandler('/sobre')} className="hover:text-[#FF9147] transition-colors">
                  Sobre o Ferramentas &amp; Garagem
                </a>
              </li>
              <li>
                <a href="/contato" onClick={linkHandler('/contato')} className="hover:text-[#FF9147] transition-colors">
                  Contato Editorial
                </a>
              </li>
              <li>
                <a href="/afiliados" onClick={linkHandler('/afiliados')} className="hover:text-[#FF9147] transition-colors">
                  Política de Afiliados
                </a>
              </li>
              <li>
                <a href="/privacidade" onClick={linkHandler('/privacidade')} className="hover:text-[#FF9147] transition-colors">
                  Política de Privacidade (LGPD)
                </a>
              </li>
              <li>
                <a href="/termos" onClick={linkHandler('/termos')} className="hover:text-[#FF9147] transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="text-left hover:text-[#FF9147] transition-colors"
                >
                  Preferências de Cookies
                </button>
              </li>
              <li className="pt-1">
                <a
                  href="/admin"
                  onClick={linkHandler('/admin')}
                  className="text-xs text-[#A9ADB2]/70 hover:text-white transition-colors"
                >
                  Painel Administrativo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A9ADB2]/80">
          <p>© {new Date().getFullYear()} Ferramentas &amp; Garagem. Todos os direitos reservados.</p>
          <p>Conteúdo técnico independente · Programa de Afiliados do Mercado Livre</p>
        </div>
      </div>
    </footer>
  );
}
