
import React from 'react';
import { MaintenanceRequest } from '@/types/maintenance';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useMaintenanceData } from './hooks/useMaintenanceData';

interface BasicInfoStepProps {
  formData: MaintenanceRequest;
  updateFormData: (key: string, value: string) => void;
  nextStep: () => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, updateFormData, nextStep }) => {
  const { isLoading, branches, serviceTypes } = useMaintenanceData();

  const isFormValid = () => {
    return formData.branch && formData.serviceType && formData.title;
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="h-8 w-8 animate-spin text-construction-primary" />
        <span className="mr-2">جاري تحميل البيانات...</span>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="border-r-4 border-construction-primary pr-3">
        <h2 className="text-2xl font-bold">المعلومات الأساسية</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="branch">
            اختر الفرع <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.branch}
            onValueChange={(value) => updateFormData('branch', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الفرع المطلوب" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.name}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceType">
            نوع الخدمة <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.serviceType}
            onValueChange={(value) => updateFormData('serviceType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر نوع الخدمة" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map((service) => (
                <SelectItem key={service.id} value={service.name}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">
          عنوان طلب الصيانة <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          placeholder="أدخل عنوان مختصر للطلب"
          value={formData.title}
          onChange={(e) => updateFormData('title', e.target.value)}
        />
      </div>

      <div className="flex justify-start mt-6">
        <Button
          onClick={nextStep}
          disabled={!isFormValid()}
          className="bg-construction-primary text-white flex items-center"
        >
          التالي
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="m15 18-6-6 6-6"></path></svg>
        </Button>
      </div>
    </div>
  );
};

export default BasicInfoStep;
