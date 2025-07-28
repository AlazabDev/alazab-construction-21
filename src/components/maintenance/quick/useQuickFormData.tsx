
import { useState } from 'react';
import { MaintenanceRequest } from '@/types/maintenance';
import { useMaintenanceData } from '../hooks/useMaintenanceData';

export const useQuickFormData = () => {
  const { isLoading, branches, serviceTypes } = useMaintenanceData();
  const [formData, setFormData] = useState<MaintenanceRequest>({
    branch: '',
    serviceType: '',
    title: '',
    description: '',
    priority: 'medium',
    requestedDate: new Date().toISOString().split('T')[0],
    estimatedCost: '',
    attachments: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData({
        ...formData,
        attachments: filesArray
      });
    }
  };

  const resetForm = () => {
    setFormData({
      branch: '',
      serviceType: '',
      title: '',
      description: '',
      priority: 'medium',
      requestedDate: new Date().toISOString().split('T')[0],
      estimatedCost: '',
      attachments: []
    });
  };

  return {
    isLoading,
    branches,
    serviceTypes,
    formData,
    handleChange,
    handleSelectChange,
    handleFileChange,
    resetForm
  };
};
