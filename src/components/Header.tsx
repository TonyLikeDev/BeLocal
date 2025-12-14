import { useState } from 'react';
import { Menu, X, MapPin, Search, User, Heart, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthModal from './AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <img 
                src="https://avatars.githubusercontent.com/u/17284363?s=280&v=4" 
                alt="BeLocal Logo" 
                className="w-10 h-10 rounded-xl"
              />
              <span className="font-bold text-xl text-foreground">BeLocal</span>
            </a>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search activities, locations..." 
                  className="pl-10 pr-10 bg-muted/50 border-0 focus-visible:ring-primary"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => setIsAuthOpen(true)}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search activities..." 
                  className="pl-10 bg-muted/50 border-0"
                />
              </div>
              <nav className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start">
                  <Heart className="h-4 w-4 mr-3" />
                  Wishlist
                </Button>
                <Button variant="ghost" className="justify-start">
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </Button>
                <Button 
                  variant="default" 
                  className="justify-start"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                >
                  <LogIn className="h-4 w-4 mr-3" />
                  Login / Sign Up
                </Button>
              </nav>
            </div>
          </div>
        )}
      </header>

      <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </>
  );
};

export default Header;
