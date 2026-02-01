
import { User, Task, Snippet, Notification, WorkflowNode, WorkflowEdge } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Morgan',
  email: 'alex@codeflow.dev',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'Senior Full Stack Developer',
  status: 'online',
  location: 'San Francisco, CA'
};

export const USERS: User[] = [
  CURRENT_USER,
  {
    id: 'u2',
    name: 'Sarah Chen',
    email: 'sarah@codeflow.dev',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Product Designer',
    status: 'online',
    location: 'New York, NY'
  },
  {
    id: 'u3',
    name: 'David Kim',
    email: 'david@codeflow.dev',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'DevOps Engineer',
    status: 'busy',
    location: 'Seoul, KR'
  },
  {
    id: 'u4',
    name: 'Emily Watson',
    email: 'emily@codeflow.dev',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Frontend Developer',
    status: 'offline',
    location: 'London, UK'
  }
];

export const TASKS: Task[] = [
  { id: 't1', title: 'Implement Auth Flow', project: 'CodeFlow Core', status: 'todo', priority: 'high', assignees: ['u1'], dueDate: 'Tomorrow', comments: 2, attachments: 0 },
  { id: 't2', title: 'Database Schema Design', project: 'CodeFlow Core', status: 'todo', priority: 'medium', assignees: ['u1', 'u3'], dueDate: 'Oct 28', comments: 5, attachments: 2 },
  { id: 't3', title: 'API Integration', project: 'Dashboard V2', status: 'in-progress', priority: 'high', assignees: ['u2'], dueDate: 'Today', comments: 3, attachments: 1 },
  { id: 't4', title: 'Refactor Analytics Module', project: 'Analytics', status: 'in-progress', priority: 'medium', assignees: ['u4'], dueDate: 'Nov 01', comments: 0, attachments: 0 },
  { id: 't5', title: 'Landing Page Copy', project: 'Marketing', status: 'review', priority: 'low', assignees: ['u2'], dueDate: 'Nov 05', comments: 8, attachments: 4 },
  { id: 't6', title: 'Setup CI/CD Pipeline', project: 'Infrastructure', status: 'done', priority: 'high', assignees: ['u3'], dueDate: 'Oct 20', comments: 1, attachments: 0 },
];

const FASTAPI_BACKEND = `
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import os
import openai
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# --- Configuration ---
DATABASE_URL = "postgresql://user:password@localhost/codeflow_db"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# --- Database Setup ---
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Interaction(Base):
    __tablename__ = "ai_interactions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    prompt = Column(Text)
    response = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# --- App Setup ---
app = FastAPI(title="CodeFlow AI Backend", version="1.0.0")

class PromptRequest(BaseModel):
    user_id: str
    prompt: str
    context: Optional[str] = None

class AIResponse(BaseModel):
    response: str
    tokens_used: int

# --- Dependencies ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Routes ---
@app.post("/api/v1/ai/generate", response_model=AIResponse)
async def generate_response(request: PromptRequest, db = Depends(get_db)):
    try:
        # Call AI Model (e.g., GPT-4 or Gemini)
        # Using mock call for structure
        completion = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a coding assistant."},
                {"role": "user", "content": request.prompt}
            ]
        )
        
        ai_text = completion.choices[0].message.content
        
        # Save to Database
        interaction = Interaction(
            user_id=request.user_id,
            prompt=request.prompt,
            response=ai_text
        )
        db.add(interaction)
        db.commit()
        
        return AIResponse(response=ai_text, tokens_used=completion.usage.total_tokens)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/health")
def health_check():
    return {"status": "operational", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
`;

const NEXUS_CORE_PYTHON = `
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.ensemble import RandomForestClassifier
from sklearn.cluster import DBSCAN
from collections import deque
import random

class NexusBrain:
    """
    Advanced Multi-Modal AI System
    Integrates RL (DQN), Supervised Learning (RF), and Unsupervised Clustering.
    """
    def __init__(self, state_size=24, action_size=4):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.state_size = state_size
        self.action_size = action_size
        self.memory = deque(maxlen=2000)
        
        # Hyperparameters
        self.gamma = 0.95    # discount rate
        self.epsilon = 1.0   # exploration rate
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        
        # Models
        self.policy_net = self._build_model().to(self.device)
        self.target_net = self._build_model().to(self.device)
        self.classifier = RandomForestClassifier(n_estimators=100)
        self.cluster_algo = DBSCAN(eps=0.3, min_samples=10)
        
        self.update_target_model()

    def _build_model(self):
        """Builds a Deep Neural Network for Q-Learning"""
        return nn.Sequential(
            nn.Linear(self.state_size, 64),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(64, 64),
            nn.ReLU(),
            nn.Linear(64, self.action_size)
        )
    # ... (Rest of class implementation)
`;

export const SNIPPETS: Snippet[] = [
  {
    id: 's_backend',
    title: 'CodeFlow AI Backend (FastAPI)',
    language: 'Python',
    description: 'Complete production-ready backend with FastAPI, SQLAlchemy (PostgreSQL), and OpenAI/Gemini integration endpoints.',
    tags: ['backend', 'fastapi', 'python'],
    lastEdited: 'Just now',
    code: FASTAPI_BACKEND
  },
  {
    id: 's_ai',
    title: 'Nexus Autonomous Core',
    language: 'Python',
    description: 'Production-ready AI system integrating Reinforcement Learning (DQN), Genetic Algorithms, and Pattern Recognition.',
    tags: ['ai', 'pytorch', 'machine-learning'],
    lastEdited: '1h ago',
    code: NEXUS_CORE_PYTHON
  },
  {
    id: 's1',
    title: 'useLocalStorage Hook',
    language: 'TypeScript',
    description: 'Custom hook to persist state in local storage with automatic JSON parsing.',
    tags: ['react', 'hooks'],
    lastEdited: '2m ago',
    code: `import { useState, useEffect } from 'react';\n\nexport function useLocalStorage<T>(key: string, initialValue: T) {\n  const [storedValue, setStoredValue] = useState<T>(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      console.error(error);\n      return initialValue;\n    }\n  });\n\n  // ... rest of implementation\n}`
  },
  {
    id: 's3',
    title: 'API Fetch Wrapper',
    language: 'JavaScript',
    description: 'Async wrapper for the native fetch API with error handling.',
    tags: ['api', 'async'],
    lastEdited: '3d ago',
    code: `async function http(path, config) {\n  const request = new Request(path, config);\n  const response = await fetch(request);\n\n  if (!response.ok) {\n    throw new Error(response.statusText);\n  }\n  return response.json().catch(() => ({}));\n}`
  }
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'mention', user: 'u2', title: 'Sarah Miller', message: 'mentioned you in Frontend/Dashboard', time: '2m ago', read: false },
  { id: 'n2', type: 'alert', title: 'System Alert', message: 'API response time exceeded threshold (500ms) in us-east-1.', time: '15m ago', read: false },
  { id: 'n3', type: 'success', title: 'Deployment Successful', message: 'Release v2.4.0 has been deployed to production.', time: '1h ago', read: false },
  { id: 'n4', type: 'info', user: 'u3', title: 'David Chen', message: 'assigned you a task: Implement OAuth 2.0 Flow', time: 'Yesterday', read: true },
];

export const WORKFLOW_NODES: WorkflowNode[] = [
  { id: 'w1', type: 'trigger', label: 'Issue Created', x: 150, y: 200, icon: 'bolt', color: 'text-yellow-500 border-yellow-500/50' },
  { id: 'w2', type: 'condition', label: 'Filter Priority', x: 500, y: 200, icon: 'call_split', color: 'text-purple-500 border-purple-500/50' },
  { id: 'w3', type: 'action', label: 'Sync to GitHub', x: 850, y: 100, icon: 'sync', color: 'text-blue-500 border-blue-500/50' },
  { id: 'w4', type: 'action', label: 'Notify Slack', x: 850, y: 300, icon: 'chat', color: 'text-green-500 border-green-500/50' },
];

export const WORKFLOW_EDGES: WorkflowEdge[] = [
  { id: 'e1', from: 'w1', to: 'w2' },
  { id: 'e2', from: 'w2', to: 'w3' },
  { id: 'e3', from: 'w2', to: 'w4' },
];

export const AI_LOGS = [
  "[SYSTEM] Nexus Brain initialized on CUDA:0",
  "[INFO] Loading dataset: financial_markets_q4.csv",
  "[PREPROCESS] Normalizing input vectors (StandardScaler)...",
  "[RL] Episode 1/1000 started. Epsilon: 1.0",
  "[RL] Episode 1 completed. Reward: -14.2",
  "[RL] Episode 2 completed. Reward: -8.5",
  "[INFO] Genetic Algorithm: New population generated (Size: 50)",
  "[WARN] High variance detected in Sector 7 input nodes",
  "[RL] Episode 50 completed. Reward: 12.4 (Convergence detected)"
];
