import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80">
              <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-foreground">FoodSaver</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/discover"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/discover") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Discover Food
            </Link>
            <Link
              to="/post-food"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/post-food") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Share Food
            </Link>
            <Link
              to="/orders"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/orders") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              My Orders
            </Link>
            <Link
              to="/rewards"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/rewards") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Rewards
            </Link>
            <Link
              to="/community"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/community") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Community
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/profile">
              <Button variant="outline" className="rounded-full">
                Profile
              </Button>
            </Link>
            <Link to="/post-food">
              <Button className="rounded-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-all">
                Share Food
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive("/") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                to="/discover"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive("/discover") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Discover Food
              </Link>
              <Link
                to="/post-food"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive("/post-food") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Share Food
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive("/orders") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                My Orders
              </Link>
              <Link
                to="/rewards"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive("/rewards") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Rewards
              </Link>
              <Link
                to="/community"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive("/community") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Community
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full">
                    Profile
                  </Button>
                </Link>
                <Link to="/post-food" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full rounded-full bg-gradient-to-r from-primary to-primary/90">
                    Share Food
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
