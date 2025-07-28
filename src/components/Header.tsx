
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Wrench, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdvancedSidebar } from './layout/AdvancedSidebar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const navigationItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'خدماتنا', href: '/services' },
    { name: 'مشاريعنا', href: '/projects-gallery' },
    { name: 'من نحن', href: '/about' },
    { name: 'الشات بوت', href: '/chatbot' },
    { name: 'اتصل بنا', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-construction-primary rounded-lg p-1"
            aria-label="العودة للصفحة الرئيسية - شركة العزب للمقاولات العامة"
          >
            <div className="w-10 h-10 bg-construction-primary rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-construction-primary">شركة العزب</h1>
              <p className="text-sm text-gray-600">للمقاولات العامة</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="التنقل الرئيسي">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-base font-medium transition-colors hover:text-construction-primary focus:outline-none focus:ring-2 focus:ring-construction-primary rounded px-2 py-1 ${
                  isActive(item.href) 
                    ? 'text-construction-primary border-b-2 border-construction-primary pb-1' 
                    : 'text-gray-700'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name === 'الشات بوت' && <MessageSquare className="w-4 h-4 inline ml-1" aria-hidden="true" />}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons and Sidebar Toggle */}
          <div className="flex items-center gap-4">
            {/* Advanced Sidebar Toggle */}
            {isMobile ? (
              <Drawer open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <DrawerTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-construction-primary text-construction-primary hover:bg-construction-primary hover:text-white"
                    aria-label="فتح القائمة الجانبية"
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[85vh]">
                  <AdvancedSidebar onClose={() => setIsSidebarOpen(false)} />
                </DrawerContent>
              </Drawer>
            ) : (
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-construction-primary text-construction-primary hover:bg-construction-primary hover:text-white"
                    aria-label="فتح القائمة الجانبية"
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <AdvancedSidebar onClose={() => setIsSidebarOpen(false)} />
                </SheetContent>
              </Sheet>
            )}

            {/* Login Button */}
            <div className="hidden md:flex">
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  className="border-construction-primary text-construction-primary hover:bg-construction-primary hover:text-white focus:ring-2 focus:ring-construction-primary"
                >
                  تسجيل الدخول
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-6 mt-6" role="navigation" aria-label="التنقل المتنقل">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-construction-primary focus:outline-none focus:ring-2 focus:ring-construction-primary rounded px-2 py-1 ${
                      isActive(item.href) 
                        ? 'text-construction-primary' 
                        : 'text-gray-700'
                    }`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.name === 'الشات بوت' && <MessageSquare className="w-4 h-4 inline ml-1" aria-hidden="true" />}
                    {item.name}
                  </Link>
                ))}
                
                <div className="border-t pt-6 space-y-3">
                  <Link to="/maintenance-request" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-construction-primary hover:bg-construction-dark text-white">
                      طلب صيانة
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-construction-primary text-construction-primary hover:bg-construction-primary hover:text-white">
                      تسجيل الدخول
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
