import React, { useState, useEffect } from "react";
import { Menu, X, Code, PenTool, User, Mail, Github, Linkedin } from "lucide-react";
import "../styles/global.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Projects", href: "#projects", icon: <Code className="w-4 h-4 mr-2" /> },
    { label: "Skills", href: "#skills", icon: <PenTool className="w-4 h-4 mr-2" /> },
    { label: "About", href: "#about", icon: <User className="w-4 h-4 mr-2" /> },
    { label: "Contact", href: "#contact", icon: <Mail className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 ${
        scrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm text-white" 
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#" 
          className="text-lg font-display font-medium hover:opacity-80 transition-opacity"
          onClick={closeMenu}
        >
          <span className="text-gradient font-medium animate-gradient">Lyle.Dev</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium hover-underline flex items-center text-foreground/80 hover:text-foreground transition-colors relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <a 
            href="https://github.com/lyle-bongani" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-secondary transition-colors hover:rotate-12 hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/lyle-chadya-267957319/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-secondary transition-colors hover:rotate-12 hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 focus:outline-none hover:rotate-90 transition-transform duration-300"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-white dark:bg-gray-900 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "60px" }}
      >
        <div className="flex flex-col p-8 space-y-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center py-2 font-medium text-lg hover:text-primary/80 transition-colors hover:translate-x-4"
              onClick={closeMenu}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
          
          <div className="flex space-x-4 pt-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors hover:rotate-12 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors hover:rotate-12 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;