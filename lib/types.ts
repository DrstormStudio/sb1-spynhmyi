export type Role = 'admin' | 'author' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Page {
  id: string;
  title: string;
  content: string;
  parentId?: string;
  workspaceId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}