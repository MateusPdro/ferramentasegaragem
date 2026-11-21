import { useEffect } from 'react';
import { CookieConsent } from './components/CookieConsent';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PortalProvider, usePortal } from './context/PortalContext';
import { AdminPage } from './pages/AdminPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { ComparatorPage } from './pages/ComparatorPage';
import { GuidesPage } from './pages/GuidesPage';
import { HomePage } from './pages/HomePage';
import {
  AboutPage,
  AffiliatesPolicyPage,
  ContactPage,
  PrivacyPage,
  TermsPage,
} from './pages/InstitutionalPages';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SearchPage } from './pages/SearchPage';

function CompareToast() {
  const { compareToast, clearCompareToast, navigate, pathname } = usePortal();

  useEffect(() => {
    if (!compareToast) return;
    const timer = setTimeout(clearCompareToast, 4000);
    return () => clearTimeout(timer);
  }, [compareToast, clearCompareToast]);

  if (!compareToast || pathname === '/comparativos' || pathname === '/comparar') return null;

  return (
    <div
      role="status"
      className="fixed bottom-16 right-4 z-40 bg-[#17191C] text-white border border-[#F47721] rounded-md px-4 py-3 shadow-lg flex items-center gap-3 text-xs"
    >
      <span>{compareToast}</span>
      <button
        type="button"
        onClick={() => {
          clearCompareToast();
          navigate('/comparativos');
        }}
        className="text-[#FF9147] font-bold hover:underline whitespace-nowrap"
      >
        Ver comparador
      </button>
    </div>
  );
}

function RouterView() {
  const { pathname, navigate } = usePortal();
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath === '/') return <HomePage />;
  if (cleanPath === '/ferramentas' || cleanPath === '/busca') return <SearchPage />;
  if (cleanPath === '/comparativos' || cleanPath === '/comparar') return <ComparatorPage />;
  if (cleanPath === '/guias') return <GuidesPage />;
  if (cleanPath === '/sobre') return <AboutPage />;
  if (cleanPath === '/contato') return <ContactPage />;
  if (cleanPath === '/privacidade') return <PrivacyPage />;
  if (cleanPath === '/afiliados') return <AffiliatesPolicyPage />;
  if (cleanPath === '/termos') return <TermsPage />;
  if (cleanPath === '/admin') return <AdminPage />;

  if (cleanPath.startsWith('/categoria/')) {
    const slug = decodeURIComponent(cleanPath.slice('/categoria/'.length));
    return <CategoryPage slug={slug} />;
  }

  if (cleanPath.startsWith('/produto/')) {
    const slug = decodeURIComponent(cleanPath.slice('/produto/'.length));
    return <ProductDetailPage slug={slug} />;
  }

  if (cleanPath.startsWith('/artigo/')) {
    const slug = decodeURIComponent(cleanPath.slice('/artigo/'.length));
    return <ArticleDetailPage slug={slug} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
      <h1 className="font-display text-3xl font-bold text-[#17191C]">Página não encontrada</h1>
      <p className="text-sm text-[#4A4F55]">
        O endereço acessado não existe ou foi atualizado no portal.
      </p>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="px-5 py-2.5 rounded-md bg-[#F47721] text-[#17191C] text-sm font-bold"
      >
        Voltar para o início
      </button>
    </div>
  );
}

export default function App() {
  return (
    <PortalProvider>
      <div className="min-h-screen flex flex-col bg-[#F2F2EF] text-[#25292D]">
        <Header />
        <main className="flex-1">
          <RouterView />
        </main>
        <Footer />
        <CompareToast />
        <CookieConsent />
      </div>
    </PortalProvider>
  );
}
