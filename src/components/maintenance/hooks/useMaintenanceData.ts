
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BranchData, ServiceTypeData } from '@/types/maintenance';
import { toast } from "@/components/ui/use-toast";

export const useMaintenanceData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [branches, setBranches] = useState<BranchData[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceTypeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // جلب بيانات الفروع
        const { data: storesData, error: storesError } = await supabase
          .from('stores')
          .select('id, name')
          .eq('is_deleted', false);
        
        if (storesError) {
          console.error('خطأ في جلب بيانات الفروع:', storesError);
          throw storesError;
        }
        
        // جلب أنواع خدمات الصيانة
        const { data: servicesData, error: servicesError } = await supabase
          .from('maintenance_services')
          .select('id, name, description')
          .eq('is_active', true)
          .eq('is_deleted', false);
        
        if (servicesError) {
          console.error('خطأ في جلب بيانات الخدمات:', servicesError);
          throw servicesError;
        }
        
        setBranches(storesData || []);
        setServiceTypes(servicesData || []);

        console.log('تم تحميل البيانات بنجاح:', { 
          branches: storesData?.length, 
          services: servicesData?.length 
        });
      } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
        toast({
          title: "خطأ في تحميل البيانات",
          description: "سيتم استخدام البيانات الافتراضية",
          variant: "destructive",
        });
        
        // استخدام البيانات الافتراضية
        setBranches([
          { id: "1", name: "الرياض" },
          { id: "2", name: "جدة" },
          { id: "3", name: "مكة" },
          { id: "4", name: "المدينة" },
          { id: "5", name: "الدمام" },
          { id: "6", name: "الخبر" }
        ]);
        
        setServiceTypes([
          { id: "1", name: "صيانة عامة" },
          { id: "2", name: "صيانة كهربائية" },
          { id: "3", name: "صيانة سباكة" },
          { id: "4", name: "صيانة تكييف" },
          { id: "5", name: "صيانة أجهزة" },
          { id: "6", name: "أخرى" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return {
    isLoading,
    branches,
    serviceTypes
  };
};
