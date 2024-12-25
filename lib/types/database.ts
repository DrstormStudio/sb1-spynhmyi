export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workspace_members: {
        Row: {
          workspace_id: string
          user_id: string
          role: 'admin' | 'author' | 'user'
          created_at: string
        }
        Insert: {
          workspace_id: string
          user_id: string
          role?: 'admin' | 'author' | 'user'
          created_at?: string
        }
        Update: {
          workspace_id?: string
          user_id?: string
          role?: 'admin' | 'author' | 'user'
          created_at?: string
        }
      }
      pages: {
        Row: {
          id: string
          workspace_id: string
          parent_id: string | null
          title: string
          content: string | null
          created_at: string
          updated_at: string
          created_by: string
          updated_by: string
        }
        Insert: {
          id?: string
          workspace_id: string
          parent_id?: string | null
          title: string
          content?: string | null
          created_at?: string
          updated_at?: string
          created_by: string
          updated_by: string
        }
        Update: {
          id?: string
          workspace_id?: string
          parent_id?: string | null
          title?: string
          content?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string
          updated_by?: string
        }
      }
    }
  }
}