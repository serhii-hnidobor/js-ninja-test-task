export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      Hero: {
        Row: {
          catch_phrase: string;
          created_at: string;
          id: string;
          Images: string[] | null;
          nickname: string;
          origin_description: string;
          real_name: string;
          superpowers: string[] | null;
          updated_at: string;
        };
        Insert: {
          catch_phrase: string;
          created_at?: string;
          id: string;
          Images?: string[] | null;
          nickname: string;
          origin_description: string;
          real_name: string;
          superpowers?: string[] | null;
          updated_at: string;
        };
        Update: {
          catch_phrase?: string;
          created_at?: string;
          id?: string;
          Images?: string[] | null;
          nickname?: string;
          origin_description?: string;
          real_name?: string;
          superpowers?: string[] | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
