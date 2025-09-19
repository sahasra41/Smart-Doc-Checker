import React, { useCallback, useState, DragEvent } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { Document } from '../types';

interface FileUploadProps {
  documents: Document[];
  onUpload: (file: File) => Promise<Document>;
  onRemove: (documentId: string) => void;
  maxFiles?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  documents,
  onUpload,
  onRemove,
  maxFiles = 5
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());

  const handleDrop = useCallback(async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.includes('text') || file.type.includes('pdf') || file.name.endsWith('.txt')
    );

    for (const file of files.slice(0, maxFiles - documents.length)) {
      const fileId = Math.random().toString(36).substr(2, 9);
      setUploadingFiles(prev => new Set([...prev, fileId]));
      
      try {
        await onUpload(file);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setUploadingFiles(prev => {
          const newSet = new Set(prev);
          newSet.delete(fileId);
          return newSet;
        });
      }
    }
  }, [documents.length, maxFiles, onUpload]);

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files).slice(0, maxFiles - documents.length)) {
      const fileId = Math.random().toString(36).substr(2, 9);
      setUploadingFiles(prev => new Set([...prev, fileId]));
      
      try {
        await onUpload(file);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setUploadingFiles(prev => {
          const newSet = new Set(prev);
          newSet.delete(fileId);
          return newSet;
        });
      }
    }
    e.target.value = '';
  }, [documents.length, maxFiles, onUpload]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Upload Documents for Analysis
          </h3>
          <p className="text-gray-600">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supports: .txt, .pdf, and other text documents
          </p>
        </div>
        <input
          type="file"
          multiple
          accept=".txt,.pdf,.doc,.docx"
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors"
        >
          Choose Files
        </label>
      </div>

      {documents.length >= maxFiles && (
        <div className="flex items-center space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <span className="text-sm text-amber-800">
            Maximum of {maxFiles} files allowed. Remove some files to upload more.
          </span>
        </div>
      )}

      {documents.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Uploaded Documents ({documents.length})</h4>
          <div className="grid gap-3">
            {documents.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <File className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{document.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(document.size)} • Uploaded {document.uploadDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(document.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploadingFiles.size > 0 && (
        <div className="space-y-2">
          {Array.from(uploadingFiles).map(fileId => (
            <div key={fileId} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-md">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-blue-800">Uploading document...</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};