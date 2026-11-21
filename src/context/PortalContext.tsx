import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toggleCompareSelection } from '../lib/catalog';
import type { AdminUser, Article, Category, Product } from '../types/index';

export type CookiePreference = 'unset' | 'essential' | 'all';

interface PortalContextValue {
  pathname: string;
  searchParams: URLSearchParams;
  navigate: (to: string) => void;
  categories: Category[];
  products: Product[];
  articles: Article[];
  loading: boolean;
  error: string | null;
  refreshCatalog: () => Promise<void>;
  compareIds: string[];
  compareToast: string | null;
  clearCompareToast: () => void;
  toggleCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  cookiePreference: CookiePreference;
  showCookieBanner: boolean;
  openCookiePreferences: () => void;
  saveCookiePreference: (pref: Exclude<CookiePreference, 'unset'>) => void;
  adminUser: AdminUser | null;
  setAdminUser: (user: AdminUser | null) => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);

function loadGa4IfConsented(pref: CookiePreference) {
  const gaId = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
  if (pref !== 'all' || !gaId || !gaId.trim()) return;
  if (document.getElementById('fg-ga4-script')) return;

  const script = document.createElement('script');
  script.id = 'fg-ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId.trim())}`;
  document.head.appendChild(script);

  const inline = document.createElement('script');
  inline.id = 'fg-ga4-init';
  inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId.trim()}',{anonymize_ip:true});`;
  document.head.appendChild(inline);
}

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [locationState, setLocationState] = useState(() => ({
    pathname: window.location.pathname || '/',
    search: window.location.search || '',
  }));

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fg_compare_ids');
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });
  const [compareToast, setCompareToast] = useState<string | null>(null);

  const [cookiePreference, setCookiePreference] = useState<CookiePreference>(() => {
    try {
      const saved = localStorage.getItem('fg_cookie_consent');
      if (saved === 'all' || saved === 'essential') return saved;
      return 'unset';
    } catch {
      return 'unset';
    }
  });
  const [showCookieBanner, setShowCookieBanner] = useState(() => cookiePreference === 'unset');

  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const refreshCatalog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/bootstrap');
      if (!res.ok) throw new Error('Falha ao carregar dados do portal.');
      const data = (await res.json()) as {
        categories: Category[];
        products: Product[];
        articles: Article[];
      };
      setCategories(data.categories);
      setProducts(data.products);
      setArticles(data.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar conteúdo.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshCatalog();
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.authenticated && data.user) {
          setAdminUser(data.user as AdminUser);
        }
      })
      .catch(() => {});
  }, [refreshCatalog]);

  useEffect(() => {
    loadGa4IfConsented(cookiePreference);
  }, [cookiePreference]);

  useEffect(() => {
    const onPopState = () => {
      setLocationState({
        pathname: window.location.pathname || '/',
        search: window.location.search || '',
      });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fg_compare_ids', JSON.stringify(compareIds));
    } catch {
      // ignore storage quota errors
    }
  }, [compareIds]);

  const navigate = useCallback((to: string) => {
    const targetUrl = new URL(to, window.location.origin);
    window.history.pushState({}, '', `${targetUrl.pathname}${targetUrl.search}`);
    setLocationState({
      pathname: targetUrl.pathname || '/',
      search: targetUrl.search || '',
    });
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const toggleCompare = useCallback(
    (productId: string) => {
      const result = toggleCompareSelection(compareIds, productId, products, 3);
      if (result.error) {
        setCompareToast(result.error);
        return;
      }
      setCompareIds(result.nextIds);
      const added = result.nextIds.includes(productId);
      setCompareToast(
        added
          ? `Adicionado ao comparador (${result.nextIds.length}/3).`
          : 'Produto removido do comparador.'
      );
    },
    [compareIds, products]
  );

  const removeFromCompare = useCallback((productId: string) => {
    setCompareIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
  }, []);

  const saveCookiePreference = useCallback((pref: Exclude<CookiePreference, 'unset'>) => {
    setCookiePreference(pref);
    setShowCookieBanner(false);
    try {
      localStorage.setItem('fg_cookie_consent', pref);
    } catch {
      // ignore
    }
    loadGa4IfConsented(pref);
  }, []);

  const openCookiePreferences = useCallback(() => {
    setShowCookieBanner(true);
  }, []);

  return (
    <PortalContext.Provider
      value={{
        pathname: locationState.pathname,
        searchParams: new URLSearchParams(locationState.search),
        navigate,
        categories,
        products,
        articles,
        loading,
        error,
        refreshCatalog,
        compareIds,
        compareToast,
        clearCompareToast: () => setCompareToast(null),
        toggleCompare,
        removeFromCompare,
        clearCompare,
        cookiePreference,
        showCookieBanner,
        openCookiePreferences,
        saveCookiePreference,
        adminUser,
        setAdminUser,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal(): PortalContextValue {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error('usePortal must be used inside PortalProvider');
  return ctx;
}
