export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  content?: string;
}

export interface Contradiction {
  id: string;
  type: 'time' | 'policy' | 'requirement' | 'procedure';
  severity: 'high' | 'medium' | 'low';
  documents: string[];
  conflictingStatements: string[];
  explanation: string;
  suggestion: string;
  location?: {
    document: string;
    page?: number;
    section?: string;
  }[];
}

export interface Report {
  id: string;
  generatedAt: Date;
  documents: string[];
  contradictions: Contradiction[];
  summary: {
    totalContradictions: number;
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
  };
}

export interface UsageStats {
  documentsAnalyzed: number;
  reportsGenerated: number;
  contradictionsFound: number;
  totalBilling: number;
}

export interface ExternalUpdate {
  id: string;
  source: string;
  title: string;
  updateDate: Date;
  changes: string[];
  impactedPolicies: string[];
}