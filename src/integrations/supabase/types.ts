export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      attachments: {
        Row: {
          description: string | null
          file_url: string
          id: string
          is_deleted: boolean | null
          request_id: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          description?: string | null
          file_url: string
          id?: string
          is_deleted?: boolean | null
          request_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          description?: string | null
          file_url?: string
          id?: string
          is_deleted?: boolean | null
          request_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attachments_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          request_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          request_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          request_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_requests: {
        Row: {
          actual_cost: number | null
          assigned_to: string | null
          attachments: string[] | null
          building_type: string | null
          change_log: string | null
          completion_date: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          estimated_cost: number | null
          id: string
          is_deleted: boolean | null
          issue_type: string | null
          location: string | null
          preferred_time: string | null
          primary_service_id: string | null
          priority: string | null
          requester_email: string | null
          requester_name: string | null
          requester_phone: string | null
          scheduled_date: string | null
          service_type: string | null
          status: string | null
          store_id: string | null
          technical_details: string | null
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          actual_cost?: number | null
          assigned_to?: string | null
          attachments?: string[] | null
          building_type?: string | null
          change_log?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_deleted?: boolean | null
          issue_type?: string | null
          location?: string | null
          preferred_time?: string | null
          primary_service_id?: string | null
          priority?: string | null
          requester_email?: string | null
          requester_name?: string | null
          requester_phone?: string | null
          scheduled_date?: string | null
          service_type?: string | null
          status?: string | null
          store_id?: string | null
          technical_details?: string | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          actual_cost?: number | null
          assigned_to?: string | null
          attachments?: string[] | null
          building_type?: string | null
          change_log?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_deleted?: boolean | null
          issue_type?: string | null
          location?: string | null
          preferred_time?: string | null
          primary_service_id?: string | null
          priority?: string | null
          requester_email?: string | null
          requester_name?: string | null
          requester_phone?: string | null
          scheduled_date?: string | null
          service_type?: string | null
          status?: string | null
          store_id?: string | null
          technical_details?: string | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_primary_service_id_fkey"
            columns: ["primary_service_id"]
            isOneToOne: false
            referencedRelation: "maintenance_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_requests_archive: {
        Row: {
          actual_cost: number | null
          assigned_to: string | null
          completion_date: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          estimated_cost: number | null
          id: string
          is_deleted: boolean | null
          primary_service_id: string | null
          priority: string | null
          scheduled_date: string | null
          service_type: string | null
          status: string | null
          store_id: string | null
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          actual_cost?: number | null
          assigned_to?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_deleted?: boolean | null
          primary_service_id?: string | null
          priority?: string | null
          scheduled_date?: string | null
          service_type?: string | null
          status?: string | null
          store_id?: string | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          actual_cost?: number | null
          assigned_to?: string | null
          completion_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_deleted?: boolean | null
          primary_service_id?: string | null
          priority?: string | null
          scheduled_date?: string | null
          service_type?: string | null
          status?: string | null
          store_id?: string | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      maintenance_services: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          estimated_cost: number | null
          estimated_time: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          is_deleted: boolean | null
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          estimated_time?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          estimated_time?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_deleted?: boolean | null
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      maintenance_works: {
        Row: {
          cost: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          is_deleted: boolean | null
          notes: string | null
          price: number | null
          quantity: number | null
          request_date: string | null
          request_id: string | null
          start_date: string | null
          status: string | null
          technician_id: string | null
          title: string
          total: number | null
          updated_at: string | null
          work_type: string | null
          year: number | null
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_deleted?: boolean | null
          notes?: string | null
          price?: number | null
          quantity?: number | null
          request_date?: string | null
          request_id?: string | null
          start_date?: string | null
          status?: string | null
          technician_id?: string | null
          title: string
          total?: number | null
          updated_at?: string | null
          work_type?: string | null
          year?: number | null
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_deleted?: boolean | null
          notes?: string | null
          price?: number | null
          quantity?: number | null
          request_date?: string | null
          request_id?: string | null
          start_date?: string | null
          status?: string | null
          technician_id?: string | null
          title?: string
          total?: number | null
          updated_at?: string | null
          work_type?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_works_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          related_id: string | null
          related_type: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          related_id?: string | null
          related_type?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          related_id?: string | null
          related_type?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          company_name: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_files: {
        Row: {
          file_url: string
          id: string
          name: string
          project_id: string | null
          size: number | null
          type: string | null
          uploaded_at: string | null
        }
        Insert: {
          file_url: string
          id?: string
          name: string
          project_id?: string | null
          size?: number | null
          type?: string | null
          uploaded_at?: string | null
        }
        Update: {
          file_url?: string
          id?: string
          name?: string
          project_id?: string | null
          size?: number | null
          type?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_progress: {
        Row: {
          completed_tasks: number | null
          created_at: string | null
          date: string | null
          id: string
          notes: string | null
          overall_progress: number | null
          project_id: string | null
          total_tasks: number | null
          updated_by: string | null
        }
        Insert: {
          completed_tasks?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          notes?: string | null
          overall_progress?: number | null
          project_id?: string | null
          total_tasks?: number | null
          updated_by?: string | null
        }
        Update: {
          completed_tasks?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          notes?: string | null
          overall_progress?: number | null
          project_id?: string | null
          total_tasks?: number | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_progress_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          area: string | null
          assigned_to: string | null
          budget: number | null
          category: string | null
          client_name: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          engineer_name: string | null
          id: string
          image: string | null
          location: string | null
          model3d_url: string | null
          name: string
          notes: string | null
          order_number: string | null
          progress: number | null
          project_number: string | null
          start_date: string | null
          status: string | null
          tags: string | null
          work_type: string | null
        }
        Insert: {
          area?: string | null
          assigned_to?: string | null
          budget?: number | null
          category?: string | null
          client_name?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          engineer_name?: string | null
          id?: string
          image?: string | null
          location?: string | null
          model3d_url?: string | null
          name: string
          notes?: string | null
          order_number?: string | null
          progress?: number | null
          project_number?: string | null
          start_date?: string | null
          status?: string | null
          tags?: string | null
          work_type?: string | null
        }
        Update: {
          area?: string | null
          assigned_to?: string | null
          budget?: number | null
          category?: string | null
          client_name?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          engineer_name?: string | null
          id?: string
          image?: string | null
          location?: string | null
          model3d_url?: string | null
          name?: string
          notes?: string | null
          order_number?: string | null
          progress?: number | null
          project_number?: string | null
          start_date?: string | null
          status?: string | null
          tags?: string | null
          work_type?: string | null
        }
        Relationships: []
      }
      regions: {
        Row: {
          code: string | null
          coordinates: Json | null
          created_at: string | null
          id: string
          is_active: boolean | null
          level: number
          name: string
          parent_id: string | null
          updated_at: string | null
        }
        Insert: {
          code?: string | null
          coordinates?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          level?: number
          name: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string | null
          coordinates?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          level?: number
          name?: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      request_status_log: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: string
          is_deleted: boolean | null
          note: string | null
          request_id: string | null
          status: string
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          is_deleted?: boolean | null
          note?: string | null
          request_id?: string | null
          status: string
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          is_deleted?: boolean | null
          note?: string | null
          request_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "request_status_log_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      service_boq_items: {
        Row: {
          created_at: string
          id: string
          item_name: string
          notes: string | null
          quantity: number
          service_request_id: string
          total_price: number | null
          unit: string | null
          unit_price: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          item_name: string
          notes?: string | null
          quantity: number
          service_request_id: string
          total_price?: number | null
          unit?: string | null
          unit_price?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          item_name?: string
          notes?: string | null
          quantity?: number
          service_request_id?: string
          total_price?: number | null
          unit?: string | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "service_boq_items_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      service_file_uploads: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          service_request_id: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          service_request_id: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          service_request_id?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_file_uploads_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          appointment_date: string | null
          area_sqm: number
          client_email: string
          client_phone: string
          created_at: string
          detailed_description: string | null
          electronic_signature: string | null
          estimated_cost: number | null
          execution_method: Database["public"]["Enums"]["execution_method"]
          expected_end_date: string | null
          expected_start_date: string | null
          id: string
          location_address: string
          location_latitude: number | null
          location_longitude: number | null
          notes: string | null
          payment_system: Database["public"]["Enums"]["payment_system"]
          property_type: Database["public"]["Enums"]["property_type"]
          quality_level: Database["public"]["Enums"]["quality_level"]
          service_type: Database["public"]["Enums"]["service_type"]
          status: Database["public"]["Enums"]["request_status"] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          appointment_date?: string | null
          area_sqm: number
          client_email: string
          client_phone: string
          created_at?: string
          detailed_description?: string | null
          electronic_signature?: string | null
          estimated_cost?: number | null
          execution_method: Database["public"]["Enums"]["execution_method"]
          expected_end_date?: string | null
          expected_start_date?: string | null
          id?: string
          location_address: string
          location_latitude?: number | null
          location_longitude?: number | null
          notes?: string | null
          payment_system: Database["public"]["Enums"]["payment_system"]
          property_type: Database["public"]["Enums"]["property_type"]
          quality_level: Database["public"]["Enums"]["quality_level"]
          service_type: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          appointment_date?: string | null
          area_sqm?: number
          client_email?: string
          client_phone?: string
          created_at?: string
          detailed_description?: string | null
          electronic_signature?: string | null
          estimated_cost?: number | null
          execution_method?: Database["public"]["Enums"]["execution_method"]
          expected_end_date?: string | null
          expected_start_date?: string | null
          id?: string
          location_address?: string
          location_latitude?: number | null
          location_longitude?: number | null
          notes?: string | null
          payment_system?: Database["public"]["Enums"]["payment_system"]
          property_type?: Database["public"]["Enums"]["property_type"]
          quality_level?: Database["public"]["Enums"]["quality_level"]
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      service_work_items: {
        Row: {
          category: string
          created_at: string
          custom_description: string | null
          id: string
          is_selected: boolean | null
          item_name: string
          service_request_id: string
        }
        Insert: {
          category: string
          created_at?: string
          custom_description?: string | null
          id?: string
          is_selected?: boolean | null
          item_name: string
          service_request_id: string
        }
        Update: {
          category?: string
          created_at?: string
          custom_description?: string | null
          id?: string
          is_selected?: boolean | null
          item_name?: string
          service_request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_work_items_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          area: number | null
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          email: string | null
          id: string
          is_deleted: boolean | null
          location: string | null
          map_url: string | null
          name: string
          opening_date: string | null
          phone: string | null
          region_id: string | null
          status: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          area?: number | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_deleted?: boolean | null
          location?: string | null
          map_url?: string | null
          name: string
          opening_date?: string | null
          phone?: string | null
          region_id?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          area?: number | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_deleted?: boolean | null
          location?: string | null
          map_url?: string | null
          name?: string
          opening_date?: string | null
          phone?: string | null
          region_id?: string | null
          status?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stores_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      execution_method: "design_and_execute" | "execute_only"
      payment_system: "50_percent_advance" | "one_payment" | "progress_based"
      property_type:
        | "villa"
        | "apartment"
        | "shop"
        | "office_building"
        | "warehouse"
        | "other"
      quality_level: "economy" | "medium" | "premium"
      request_status:
        | "pending"
        | "reviewed"
        | "approved"
        | "in_progress"
        | "completed"
        | "cancelled"
      service_type:
        | "construction"
        | "finishing"
        | "renovation"
        | "maintenance"
        | "interior_design"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      execution_method: ["design_and_execute", "execute_only"],
      payment_system: ["50_percent_advance", "one_payment", "progress_based"],
      property_type: [
        "villa",
        "apartment",
        "shop",
        "office_building",
        "warehouse",
        "other",
      ],
      quality_level: ["economy", "medium", "premium"],
      request_status: [
        "pending",
        "reviewed",
        "approved",
        "in_progress",
        "completed",
        "cancelled",
      ],
      service_type: [
        "construction",
        "finishing",
        "renovation",
        "maintenance",
        "interior_design",
      ],
    },
  },
} as const
