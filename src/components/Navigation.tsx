import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe, User, Settings, LogOut } from "lucide-react";
import MimerLogo from "@/components/MimerLogo";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'sv' ? 'en' : 'sv');
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
          <MimerLogo size={40} />
        </a>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="/demo" className={`text-sm font-medium transition-colors ${
            isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
          }`}>
            {t('nav.demo')}
          </a>
          <a href="/how-it-works" className={`text-sm font-medium transition-colors ${
            isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
          }`}>
            {language === 'sv' ? 'Hur det fungerar' : 'How It Works'}
          </a>
          <a href="/contact" className={`text-sm font-medium transition-colors ${
            isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
          }`}>
            {t('nav.contact')}
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className={`text-xs ${isScrolled ? '' : 'text-white hover:bg-white/10'}`}
          >
            <Globe className="h-4 w-4 mr-1" />
            {language.toUpperCase()}
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary text-white">
                      {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex items-center" onClick={() => window.location.href = '/dashboard'}>
                  <User className="mr-2 h-4 w-4" />
                  <span>{t('nav.dashboard')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center" onClick={() => window.location.href = '/dashboard'}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t('nav.settings')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('nav.signOut')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                className={isScrolled ? '' : 'text-white hover:bg-white/10'}
                onClick={() => setAuthModalOpen(true)}
              >
                {t('nav.signIn')}
              </Button>
              <Button 
                size="sm" 
                className="bg-secondary hover:bg-secondary/90 text-white shadow-lg"
                onClick={() => setAuthModalOpen(true)}
              >
                {t('nav.getStarted')}
              </Button>
            </>
          )}
        </div>
      </div>
      
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </nav>
  );
};

export default Navigation;
