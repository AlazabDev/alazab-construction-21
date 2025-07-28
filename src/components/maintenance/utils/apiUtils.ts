
import { supabase } from '@/integrations/supabase/client';
import { MaintenanceRequestDetails, AttachmentDetails } from '@/types/maintenance';

export const fetchMaintenanceRequest = async (requestNumber: string) => {
  try {
    const { data: requestData, error: requestError } = await supabase
      .from('maintenance_requests')
      .select('*')
      .eq('id', requestNumber)
      .single();
    
    if (requestError) {
      throw new Error('لم يتم العثور على الطلب');
    }
    
    // جلب بيانات الفرع إذا كان موجود
    let branchName = "غير محدد";
    if (requestData.store_id) {
      const { data: storeData } = await supabase
        .from('stores')
        .select('name')
        .eq('id', requestData.store_id)
        .single();
        
      if (storeData) {
        branchName = storeData.name;
      }
    }
    
    // تحويل البيانات
    const details: MaintenanceRequestDetails = {
      id: requestData.id,
      request_number: requestNumber,
      title: requestData.title,
      description: requestData.description,
      branch: branchName,
      service_type: requestData.service_type,
      priority: requestData.priority,
      status: requestData.status,
      scheduled_date: requestData.scheduled_date,
      estimated_cost: requestData.estimated_cost ? String(requestData.estimated_cost) : null,
      actual_cost: requestData.actual_cost ? String(requestData.actual_cost) : null,
      created_at: requestData.created_at,
      completion_date: requestData.completion_date
    };
    
    return details;
  } catch (error) {
    console.error('خطأ في جلب تفاصيل الطلب:', error);
    throw error;
  }
};

export const fetchAttachments = async (requestNumber: string) => {
  try {
    const { data: attachmentsData, error: attachmentsError } = await supabase
      .from('attachments')
      .select('*')
      .eq('request_id', requestNumber)
      .eq('is_deleted', false);
    
    if (attachmentsError) {
      console.error('خطأ في جلب المرفقات:', attachmentsError);
      return [];
    }
    
    return attachmentsData as AttachmentDetails[];
  } catch (error) {
    console.error('خطأ في جلب المرفقات:', error);
    return [];
  }
};

export const updateRequestStatus = async (requestId: string, newStatus: string) => {
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
  } catch (error) {
    console.error('خطأ في تحديث الحالة:', error);
    throw error;
  }
};

export const getStatusText = (status: string) => {
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
