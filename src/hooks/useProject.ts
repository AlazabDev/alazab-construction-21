
import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { useToast } from "./use-toast";
import { Project } from "@/types/project";

export interface ProjectFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file_url: string;
  uploaded_at: string;
}

export const useProject = (projectId: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const { toast } = useToast();

  const fetchProjectDetails = async () => {
    if (!projectId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;
      
      // تحويل البيانات إلى تنسيق Project المطلوب
      const projectData: Project = {
        id: data.id,
        name: data.name || '',
        description: data.description || '',
        location: data.location || '',
        area: data.area || '',
        category: data.category || '',
        work_type: data.work_type || '',
        status: data.status || 'جديد',
        progress: data.progress || 0,
        budget: data.budget || 0,
        start_date: data.start_date || '',
        end_date: data.end_date || '',
        client_name: data.client_name || '',
        engineer_name: data.engineer_name || '',
        assigned_to: data.assigned_to || '',
        project_number: data.project_number || '',
        order_number: data.order_number || '',
        image: data.image || '',
        model3d_url: data.model3d_url || '',
        tags: data.tags || '',
        notes: data.notes || '',
        created_at: data.created_at || ''
      };
      
      setProject(projectData);
    } catch (error) {
      console.error("Error fetching project details:", error);
      toast({
        variant: "destructive",
        title: "خطأ في جلب بيانات المشروع",
        description: "حدث خطأ أثناء محاولة استرداد بيانات المشروع"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectFiles = async () => {
    if (!projectId) return;
    
    try {
      setLoadingFiles(true);
      const { data, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', projectId)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      
      setFiles(data || []);
    } catch (error) {
      console.error("Error fetching project files:", error);
      toast({
        variant: "destructive",
        title: "خطأ في جلب ملفات المشروع",
        description: "حدث خطأ أثناء محاولة استرداد ملفات المشروع"
      });
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleDownloadFile = (file: ProjectFile) => {
    try {
      // Create a link element
      const link = document.createElement("a");
      link.href = file.file_url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "جاري التنزيل",
        description: `جاري تنزيل الملف: ${file.name}`
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      toast({
        variant: "destructive",
        title: "خطأ في تنزيل الملف",
        description: "حدث خطأ أثناء محاولة تنزيل الملف"
      });
      
      // Fallback: open in new tab
      window.open(file.file_url, '_blank');
    }
  };

  const handleDeleteFile = async (file: ProjectFile) => {
    try {
      // حذف الملف من قاعدة البيانات
      const { error } = await supabase
        .from('project_files')
        .delete()
        .eq('id', file.id);

      if (error) throw error;
      
      setFiles(files.filter(f => f.id !== file.id));
      toast({
        title: "تم حذف الملف",
        description: `تم حذف الملف: ${file.name}`
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      toast({
        variant: "destructive",
        title: "خطأ في حذف الملف",
        description: "حدث خطأ أثناء محاولة حذف الملف"
      });
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
      fetchProjectFiles();
    }
  }, [projectId]);

  return {
    project,
    loading,
    files,
    loadingFiles,
    fetchProjectDetails,
    fetchProjectFiles,
    handleDownloadFile,
    handleDeleteFile
  };
};
