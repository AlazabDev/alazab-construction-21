
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MaintenanceRequestSummary } from '@/types/maintenance';
import { toast } from "@/components/ui/use-toast";

export const useMaintenanceRequests = () => {
  const [requests, setRequests] = useState<MaintenanceRequestSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('خطأ في جلب الطلبات:', error);
        throw error;
      }

      const formattedRequests: MaintenanceRequestSummary[] = (data || []).map(request => ({
        id: request.id,
        title: request.title,
        service_type: request.service_type || 'غير محدد',
        status: request.status || 'pending',
        priority: request.priority || 'medium',
        scheduled_date: request.scheduled_date || '',
        created_at: request.created_at || ''
      }));

      setRequests(formattedRequests);
    } catch (error) {
      console.error('خطأ في جلب الطلبات:', error);
      toast({
        title: "خطأ في تحميل الطلبات",
        description: "حدث خطأ أثناء جلب طلبات الصيانة",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('maintenance_requests')
        .update({ status: newStatus })
        .eq('id', requestId);
      
      if (error) throw error;
      
      // إذا تم تعيين الحالة كمكتمل، قم بتعيين تاريخ الاكتمال
      if (newStatus === 'completed') {
        await supabase
          .from('maintenance_requests')
          .update({ completion_date: new Date().toISOString() })
          .eq('id', requestId);
      }
      
      // إضافة سجل تغيير الحالة
      await supabase
        .from('request_status_log')
        .insert({
          request_id: requestId,
          status: newStatus,
          note: `تم تغيير الحالة إلى ${getStatusText(newStatus)}`,
        });
      
      // تحديث الحالة في القائمة المحلية
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId
            ? { ...request, status: newStatus }
            : request
        )
      );
      
      toast({
        title: "تم تحديث الحالة",
        description: `تم تحديث حالة الطلب إلى ${getStatusText(newStatus)}`,
      });
      
    } catch (error) {
      console.error('خطأ في تحديث الحالة:', error);
      toast({
        title: "خطأ في تحديث الحالة",
        description: "حدث خطأ أثناء محاولة تحديث حالة الطلب",
        variant: "destructive"
      });
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'قيد الانتظار';
      case 'in progress':
      case 'in-progress':
        return 'قيد التنفيذ';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغي';
      default:
        return status || 'غير معروف';
    }
  };

  return {
    requests,
    isLoading,
    fetchRequests,
    updateRequestStatus,
    getStatusText
  };
};
