import React, { useState } from 'react';
import { Menu, Search, Scale, X } from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { Logo } from './Logo';

const NAV_ITEMS = [
  { label: 'Início', path: '/' },
  { label: 'Elétricas', path: '/categoria/ferramentas-eletricas' },
  { label: 'Manuais', path: '/categoria/ferramentas-manuais' },
  { label: 'Automotivo', path: '/categoria/equipamentos-automotivos' },
  { label: 'Limpeza', path: '/categoria/limpeza-e-acessorios' },
  { label: 'Comparativos', path: '/comparativos' },
  { label: 'Guias', path: '/guias' },
];

export function Header() {
  const { pathname, navigate, compareIds } = usePortal();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    setSearchOpen(false);
    setMobileOpen(false);
    navigate(trimmed ? `/ferramentas?q=${encodeURIComponent(trimmed)}` : '/ferramentas');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#17191C] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            setMobileOpen(false);
          }}
          className="focus-visible:outline-2 focus-visible:outline-[#F47721] rounded"
          aria-label="Ferramentas & Garagem - Página inicial"
        >
          <Logo />
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => {
            const active =
              item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
                  active
                    ? 'text-white border-[#F47721]'
                    : 'text-[#A9ADB2] border-transparent hover:text-white hover:border-white/30'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Search / Comparator Action + Mobile Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
            <label htmlFor="header-search-input" className="sr-only">
              Pesquisar ferramentas, marcas ou artigos
            </label>
            <div className="relative flex items-center">
              <input
                id="header-search-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar ferramenta..."
                className="w-36 xl:w-48 bg-[#202328] border border-white/15 rounded-md pl-3 pr-9 py-1.5 text-sm text-white placeholder:text-[#A9ADB2] focus:outline-none focus:border-[#F47721] transition-colors"
              />
              <button
                type="submit"
                aria-label="Pesquisar"
                className="absolute right-1.5 p-1 text-[#A9ADB2] hover:text-[#F47721] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Abrir pesquisa"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-[#A9ADB2] hover:text-white hover:bg-[#202328]"
          >
            <Search className="w-5 h-5" />
          </button>

          {compareIds.length > 0 && (
            <button
              type="button"
              onClick={() => navigate('/comparativos')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F47721] hover:bg-[#FF9147] text-[#17191C] text-xs font-semibold whitespace-nowrap shrink-0 transition-colors"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Comparar ({compareIds.length})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-white hover:bg-[#202328]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable mobile search bar */}
      {searchOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#202328] px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <label htmlFor="mobile-search-input" className="sr-only">
              Pesquisar ferramentas ou artigos
            </label>
            <input
              id="mobile-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar marca, modelo ou guia..."
              className="flex-1 bg-[#17191C] border border-white/15 rounded-md px-3 py-2 text-sm text-white placeholder:text-[#A9ADB2] focus:outline-none focus:border-[#F47721]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#F47721] hover:bg-[#FF9147] text-[#17191C] text-sm font-semibold whitespace-nowrap"
            >
              Buscar
            </button>
          </form>
        </div>
      )}

      {/* Compact mobile navigation menu */}
      {mobileOpen && (
        <nav
          aria-label="Menu móvel"
          className="lg:hidden border-t border-white/10 bg-[#202328] px-4 py-3 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const active =
              item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                className={`block px-3 py-2.5 rounded-md text-sm font-medium ${
                  active
                    ? 'bg-[#17191C] text-[#F47721]'
                    : 'text-white/90 hover:bg-[#17191C]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="/ferramentas"
            onClick={(e) => {
              e.preventDefault();
              navigate('/ferramentas');
              setMobileOpen(false);
            }}
            className="block px-3 py-2.5 rounded-md text-sm font-medium text-white/90 hover:bg-[#17191C]"
          >
            Catálogo Completo
          </a>
        </nav>
      )}
    </header>
  );
}
