
// src/types/project.ts
export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  area: string;
  category: string;
  work_type: string;
  status: string;
  progress: number;
  budget: number;
  start_date: string;
  end_date: string;
  client_name: string;
  engineer_name: string;
  assigned_to: string;
  project_number: string;
  order_number: string;
  image: string;
  model3d_url: string;
  tags: string;
  notes: string;
  created_at: string;
}
