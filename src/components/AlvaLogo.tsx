interface AlvaLogoProps {
  className?: string;
  size?: number;
}

const AlvaLogo = ({ className = "", size = 60 }: AlvaLogoProps) => {
  return (
    <svg 
      className={className}
      width={size * 2.5} 
      height={size} 
      viewBox="0 0 250 80" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(40, 40)">
        <circle cx="0" cy="0" r="30" fill="#5D3A63"/>
        <rect x="-18" y="-10" width="4" height="20" rx="2" fill="#FFFFFF" opacity="0.8"/>
        <rect x="-12" y="-15" width="4" height="30" rx="2" fill="#D9AAB7"/>
        <rect x="-6" y="-12" width="4" height="24" rx="2" fill="#FFFFFF" opacity="0.8"/>
        <rect x="0" y="-18" width="4" height="36" rx="2" fill="#D9AAB7"/>
        <rect x="6" y="-10" width="4" height="20" rx="2" fill="#FFFFFF" opacity="0.8"/>
        <rect x="12" y="-14" width="4" height="28" rx="2" fill="#D9AAB7"/>
        <rect x="18" y="-8" width="4" height="16" rx="2" fill="#FFFFFF" opacity="0.8"/>
      </g>
      <text x="95" y="52" fontSize="36" fontWeight="600" fill="#5D3A63">Alva</text>
    </svg>
  );
};

export default AlvaLogo;
