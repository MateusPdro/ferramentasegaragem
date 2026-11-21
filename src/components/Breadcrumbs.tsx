import { ChevronRight } from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { navigate } = usePortal();

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#60656C]">
        <li>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="hover:text-[#F47721] transition-colors"
          >
            Início
          </a>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-[#A9ADB2]" aria-hidden="true" />
              {item.path && !isLast ? (
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path!);
                  }}
                  className="hover:text-[#F47721] transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-[#25292D] font-medium" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
