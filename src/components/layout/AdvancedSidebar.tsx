
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Wrench, 
  Building, 
  Users, 
  MessageSquare, 
  Settings, 
  User, 
  FileText, 
  Calculator, 
  ChevronDown, 
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Award,
  Target,
  Briefcase,
  Camera,
  Search,
  TrendingUp,
  PlusCircle,
  Database,
  Hammer,
  UserCircle,
  HardDrive,
  Send,
  DollarSign,
  HeadphonesIcon,
  BarChart3,
  Newspaper,
  Printer,
  Palette,
  Languages,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface SidebarSection {
  title: string;
  items: SidebarItem[];
  expandable?: boolean;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  description?: string;
  comingSoon?: boolean;
  external?: boolean;
}

interface AdvancedSidebarProps {
  onClose: () => void;
}

const mainSections: SidebarSection[] = [
  {
    title: "التنقل الأساسي",
    items: [
      { title: "الرئيسية", href: "/", icon: Home, description: "العودة للصفحة الرئيسية" },
      { title: "خدماتنا", href: "/services", icon: Wrench, description: "تصفح جميع خدماتنا" },
      { title: "مشاريعنا", href: "/projects-gallery", icon: Building, description: "معرض المشاريع المنجزة" },
      { title: "من نحن", href: "/about", icon: Users, description: "تعرف على شركتنا" },
      { title: "اتصل بنا", href: "/contact", icon: Phone, description: "طرق التواصل معنا" },
    ]
  },
  {
    title: "الخدمات التفاعلية",
    items: [
      { title: "الشات بوت", href: "/chatbot", icon: MessageSquare, description: "مساعد ذكي للإجابة على استفساراتك" },
      { title: "طلب صيانة", href: "/maintenance-request", icon: Wrench, description: "تقديم طلب صيانة جديد", badge: "جديد" },
      { title: "تتبع الطلبات", href: "/maintenance-tracking", icon: Search, description: "تتبع حالة طلبات الصيانة" },
    ]
  },
  {
    title: "لوحة التحكم",
    expandable: true,
    items: [
      { title: "لوحة التحكم", href: "/dashboard", icon: TrendingUp, description: "إحصائيات ونظرة عامة" },
      { title: "إدارة المشاريع", href: "/project-management", icon: Briefcase, description: "إدارة المشاريع الجارية" },
      { title: "قائمة الصيانة", href: "/maintenance-list", icon: FileText, description: "جميع طلبات الصيانة" },
      { title: "الملف الشخصي", href: "/profile", icon: User, description: "إعدادات الحساب الشخصي" },
      { title: "الإعدادات", href: "/settings", icon: Settings, description: "إعدادات النظام" },
    ]
  }
];

const applicationsSections: SidebarSection[] = [
  {
    title: "تطبيقات الشركة",
    expandable: true,
    items: [
      { title: "الأصول", href: "https://alazab.com/assets", icon: Database, description: "إدارة أصول الشركة", external: true },
      { title: "منشئ المواقع", href: "https://alazab.com/builder", icon: Hammer, description: "أداة بناء المواقع", external: true },
      { title: "إدارة العملاء", href: "https://alazab.com/crm", icon: UserCircle, description: "نظام إدارة علاقات العملاء", external: true },
      { title: "التخزين السحابي", href: "https://alazab.com/drive", icon: HardDrive, description: "منصة التخزين والملفات", external: true },
      { title: "خدمة البريد", href: "https://alazab.com/email_delivery_service", icon: Send, description: "خدمة توصيل البريد الإلكتروني", external: true },
      { title: "ERPNext", href: "https://erpnext.alazab.com", icon: Building, description: "نظام تخطيط موارد المؤسسات", external: true, badge: "مميز" },
      { title: "تقدير الأسعار", href: "https://alazab.com/erpnext_price_estimation", icon: DollarSign, description: "نظام تقدير أسعار ERPNext", external: true },
      { title: "مكتب المساعدة", href: "https://alazab.com/helpdesk", icon: HeadphonesIcon, description: "نظام دعم العملاء", external: true },
      { title: "الموارد البشرية", href: "https://alazab.com/hrms", icon: Users, description: "نظام إدارة الموارد البشرية", external: true },
      { title: "التحليلات", href: "https://alazab.com/insights", icon: BarChart3, description: "تحليلات وإحصائيات متقدمة", external: true },
      { title: "النشرة الإخبارية", href: "https://alazab.com/newsletter", icon: Newspaper, description: "إدارة النشرات الإخبارية", external: true },
      { title: "مصمم الطباعة", href: "https://alazab.com/print_designer", icon: Printer, description: "أداة تصميم المطبوعات", external: true },
      { title: "الاستوديو", href: "https://alazab.com/studio", icon: Palette, description: "استوديو التصميم والإبداع", external: true },
      { title: "المترجم", href: "https://alazab.com/translator", icon: Languages, description: "خدمة الترجمة الآلية", external: true },
      { title: "واتساب للأعمال", href: "https://alazab.com/waba_integration", icon: MessageCircle, description: "تكامل واتساب للأعمال", external: true },
    ]
  }
];

const futureSections: SidebarSection[] = [
  {
    title: "ميزات قادمة",
    items: [
      { title: "حاسبة التكلفة", href: "#", icon: Calculator, description: "احسب تكلفة مشروعك", comingSoon: true },
      { title: "معرض الصور", href: "#", icon: Camera, description: "صور عالية الجودة لمشاريعنا", comingSoon: true },
      { title: "شهادات الجودة", href: "#", icon: Award, description: "شهاداتنا ومعاييرنا", comingSoon: true },
      { title: "رؤيتنا", href: "#", icon: Target, description: "رؤية ومهمة الشركة", comingSoon: true },
    ]
  }
];

export const AdvancedSidebar: React.FC<AdvancedSidebarProps> = ({ onClose }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['التنقل الأساسي', 'الخدمات التفاعلية']);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(title => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const renderSidebarItem = (item: SidebarItem) => {
    const linkContent = (
      <div className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
        item.comingSoon 
          ? 'cursor-not-allowed opacity-60' 
          : 'hover:bg-construction-primary/10 hover:shadow-md'
      }`}>
        <div className={`p-2 rounded-md ${
          item.comingSoon 
            ? 'bg-gray-100 text-gray-400' 
            : 'bg-construction-primary/20 text-construction-primary group-hover:bg-construction-primary group-hover:text-white'
        } transition-colors`}>
          <item.icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`font-medium text-sm ${
              item.comingSoon ? 'text-gray-400' : 'text-gray-900 group-hover:text-construction-primary'
            }`}>
              {item.title}
            </span>
            {item.external && <ExternalLink className="w-3 h-3 text-gray-400" />}
            {item.badge && (
              <Badge variant="secondary" className="text-xs bg-construction-accent text-white">
                {item.badge}
              </Badge>
            )}
            {item.comingSoon && (
              <Badge variant="outline" className="text-xs">
                قريباً
              </Badge>
            )}
          </div>
          {item.description && (
            <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-600">
              {item.description}
            </p>
          )}
        </div>
      </div>
    );

    if (item.external) {
      return (
        <a
          key={item.title}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {linkContent}
        </a>
      );
    }

    return (
      <Link
        key={item.title}
        to={item.href}
        onClick={item.comingSoon ? undefined : onClose}
        className="block"
      >
        {linkContent}
      </Link>
    );
  };

  const renderSection = (section: SidebarSection) => {
    const isExpanded = expandedSections.includes(section.title);

    return (
      <div key={section.title} className="space-y-2">
        {section.expandable ? (
          <button
            onClick={() => toggleSection(section.title)}
            className="w-full flex items-center justify-between p-2 text-sm font-semibold text-gray-700 hover:text-construction-primary transition-colors"
          >
            <span>{section.title}</span>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        ) : (
          <h3 className="p-2 text-sm font-semibold text-gray-700">
            {section.title}
          </h3>
        )}
        
        {(!section.expandable || isExpanded) && (
          <div className="space-y-1">
            {section.items.map(renderSidebarItem)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-construction-primary rounded-lg flex items-center justify-center">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-construction-primary">شركة العزب</h2>
            <p className="text-sm text-gray-600">للمقاولات العامة</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Sections */}
        {mainSections.map(renderSection)}
        
        <Separator className="my-4" />
        
        {/* Applications Sections */}
        {applicationsSections.map(renderSection)}
        
        <Separator className="my-4" />
        
        {/* Future Sections */}
        {futureSections.map(renderSection)}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>المملكة العربية السعودية</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>info@alazab.com</span>
          </div>
          <Button 
            onClick={onClose}
            variant="outline" 
            size="sm" 
            className="w-full mt-3"
          >
            إغلاق القائمة
          </Button>
        </div>
      </div>
    </div>
  );
};
