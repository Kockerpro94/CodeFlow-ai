
export enum View {
  Dashboard = 'dashboard',
  Projects = 'projects',
  Tasks = 'tasks',
  Snippets = 'snippets',
  Workflows = 'workflows',
  Team = 'team',
  Settings = 'settings',
  Analytics = 'analytics',
  Billing = 'billing',
  Profile = 'profile',
  Notifications = 'notifications',
  AIStudio = 'ai_studio'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  location?: string;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'high' | 'medium' | 'low';
  assignees: string[]; // User IDs
  dueDate: string;
  comments: number;
  attachments: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stats: {
    progress: number;
    totalTasks: number;
    completedTasks: number;
  };
}

export interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  tags: string[];
  lastEdited: string;
  description: string;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  label: string;
  x: number;
  y: number;
  icon: string;
  color: string;
}

export interface WorkflowEdge {
  id: string;
  from: string;
  to: string;
}

export interface Notification {
  id: string;
  type: 'mention' | 'alert' | 'success' | 'info';
  user?: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}
