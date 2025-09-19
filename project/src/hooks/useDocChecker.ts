import { useState, useCallback } from 'react';
import { Document, Contradiction, Report, UsageStats } from '../types';

export const useDocChecker = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);
  const [usageStats, setUsageStats] = useState<UsageStats>({
    documentsAnalyzed: 0,
    reportsGenerated: 0,
    contradictionsFound: 0,
    totalBilling: 0
  });

  const uploadDocument = useCallback(async (file: File): Promise<Document> => {
    const document: Document = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date(),
      content: await file.text()
    };

    setDocuments(prev => [...prev, document]);
    return document;
  }, []);

  const removeDocument = useCallback((documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  }, []);

  const analyzeDocuments = useCallback(async (): Promise<Report> => {
    if (documents.length < 2) {
      throw new Error('At least 2 documents are required for analysis');
    }

    setIsAnalyzing(true);

    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));

    // Mock AI-generated contradictions
    const contradictions: Contradiction[] = generateMockContradictions(documents);

    const report: Report = {
      id: Math.random().toString(36).substr(2, 9),
      generatedAt: new Date(),
      documents: documents.map(doc => doc.name),
      contradictions,
      summary: {
        totalContradictions: contradictions.length,
        highPriority: contradictions.filter(c => c.severity === 'high').length,
        mediumPriority: contradictions.filter(c => c.severity === 'medium').length,
        lowPriority: contradictions.filter(c => c.severity === 'low').length,
      }
    };

    // Update usage stats and billing
    const documentCost = documents.length * 5; // $5 per document
    const reportCost = 15; // $15 per report

    setUsageStats(prev => ({
      documentsAnalyzed: prev.documentsAnalyzed + documents.length,
      reportsGenerated: prev.reportsGenerated + 1,
      contradictionsFound: prev.contradictionsFound + contradictions.length,
      totalBilling: prev.totalBilling + documentCost + reportCost
    }));

    setCurrentReport(report);
    setIsAnalyzing(false);

    return report;
  }, [documents]);

  const clearAnalysis = useCallback(() => {
    setCurrentReport(null);
    setDocuments([]);
  }, []);

  return {
    documents,
    isAnalyzing,
    currentReport,
    usageStats,
    uploadDocument,
    removeDocument,
    analyzeDocuments,
    clearAnalysis
  };
};

function generateMockContradictions(documents: Document[]): Contradiction[] {
  const contradictions: Contradiction[] = [];

  // Generate realistic contradictions based on common document conflicts
  const conflictTypes = [
    {
      type: 'time' as const,
      severity: 'high' as const,
      statements: [
        'Submit assignments before 10:00 PM',
        'Deadline for submissions is 11:59 PM'
      ],
      explanation: 'Different documents specify conflicting deadline times for assignment submissions.',
      suggestion: 'Standardize submission deadline to a single time across all documents. Consider 11:59 PM for consistency.'
    },
    {
      type: 'policy' as const,
      severity: 'medium' as const,
      statements: [
        'Minimum attendance requirement: 75%',
        'Students need at least 65% attendance to qualify'
      ],
      explanation: 'Attendance requirements vary between policy documents, creating confusion.',
      suggestion: 'Establish a unified attendance policy. Recommend using 75% as the standard across all documents.'
    },
    {
      type: 'procedure' as const,
      severity: 'high' as const,
      statements: [
        'Leave requests must be submitted 2 weeks in advance',
        'Notice period for leave: minimum 1 month'
      ],
      explanation: 'Leave request procedures have conflicting advance notice requirements.',
      suggestion: 'Clarify leave request timeline. Consider different requirements for different types of leave (sick vs. vacation).'
    },
    {
      type: 'requirement' as const,
      severity: 'low' as const,
      statements: [
        'Password must be at least 8 characters',
        'Minimum password length: 12 characters'
      ],
      explanation: 'Security policies specify different password length requirements.',
      suggestion: 'Update to consistent password policy. Modern security standards recommend 12+ characters.'
    }
  ];

  // Randomly select and generate contradictions
  const numContradictions = Math.min(conflictTypes.length, Math.floor(Math.random() * 4) + 2);
  
  for (let i = 0; i < numContradictions; i++) {
    const conflict = conflictTypes[i];
    const selectedDocs = documents.slice(0, 2).map(doc => doc.name);

    contradictions.push({
      id: Math.random().toString(36).substr(2, 9),
      type: conflict.type,
      severity: conflict.severity,
      documents: selectedDocs,
      conflictingStatements: conflict.statements,
      explanation: conflict.explanation,
      suggestion: conflict.suggestion,
      location: selectedDocs.map(doc => ({
        document: doc,
        page: Math.floor(Math.random() * 5) + 1,
        section: `Section ${Math.floor(Math.random() * 10) + 1}`
      }))
    });
  }

  return contradictions;
}