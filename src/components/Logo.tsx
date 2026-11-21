export function Logo({ lightText = true }: { lightText?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <svg
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="1" y="1" width="34" height="34" rx="6" fill="#202328" stroke="#F47721" strokeWidth="2" />
        <path d="M8 11H17V14H11.5V16.8H16V19.6H11.5V25H8V11Z" fill="#FFFFFF" />
        <path
          d="M20.5 14.5C20.5 12.4 22.1 10.9 24.4 10.9C26.4 10.9 27.8 11.9 28.2 13.7H25.2C25 13.2 24.7 13 24.2 13C23.5 13 23.1 13.6 23.1 14.7V21.2C23.1 22.3 23.6 22.9 24.4 22.9C25.2 22.9 25.6 22.4 25.6 21.3V20H24.1V17.7H28.3V25H26.3L26 23.6C25.4 24.6 24.5 25.2 23.3 25.2C21.5 25.2 20.5 23.7 20.5 21.4V14.5Z"
          fill="#F47721"
        />
      </svg>
      <span
        className={`font-display text-lg font-bold tracking-wide uppercase whitespace-nowrap ${
          lightText ? 'text-white' : 'text-[#17191C]'
        }`}
      >
        Ferramentas <span className="text-[#F47721]">&amp;</span> Garagem
      </span>
    </span>
  );
}
