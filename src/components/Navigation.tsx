import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Globe, User, Settings, LogOut } from "lucide-react";
import AlvaLogo from "@/components/AlvaLogo";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, profile, signOut } = useAuth();

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
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
          <AlvaLogo size={40} />
        </a>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="/demo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.demo')}
          </a>
          <a href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.features')}
          </a>
          <a href="/roi" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.roi')}
          </a>
          <a href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.contact')}
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="text-xs"
          >
            <Globe className="h-4 w-4 mr-1" />
            {language.toUpperCase()}
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
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
                onClick={() => setAuthModalOpen(true)}
              >
                {t('nav.signIn')}
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-alva shadow-primary hover:shadow-elevated transition-all duration-300"
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