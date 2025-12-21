import mimerLogo from "@/assets/mimer-logo.png";

interface MimerLogoProps {
  className?: string;
  size?: number;
}

const MimerLogo = ({ className = "", size = 50 }: MimerLogoProps) => {
  return (
    <img 
      src={mimerLogo} 
      alt="Mimer Technologies" 
      className={className}
      style={{ height: size, width: 'auto' }}
    />
  );
};

export default MimerLogo;
