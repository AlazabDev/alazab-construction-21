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
