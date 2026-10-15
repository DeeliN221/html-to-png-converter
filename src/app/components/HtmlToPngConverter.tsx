'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Settings, Image as ImageIcon, FileText } from 'lucide-react';

interface ConversionSettings {
  width: number;
  height: number;
}

export default function HtmlToPngConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ConversionSettings>({
    width: 1920,
    height: 1080
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/html' || selectedFile.name.endsWith('.html')) {
        setFile(selectedFile);
        setError('');
        setConverted(false);
        setDownloadUrl('');
      } else {
        setError('请选择HTML文件');
      }
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type === 'text/html' || droppedFile.name.endsWith('.html')) {
        setFile(droppedFile);
        setError('');
        setConverted(false);
        setDownloadUrl('');
      } else {
        setError('请拖拽HTML文件');
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const convertToPng = async () => {
    if (!file) return;

    setConverting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('width', settings.width.toString());
      formData.append('height', settings.height.toString());

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '转换失败');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setConverted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '转换失败');
    } finally {
      setConverting(false);
    }
  };

  const downloadImage = () => {
    if (downloadUrl && file) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = file.name.replace('.html', '.png');
      a.click();
    }
  };

  const resetConverter = () => {
    setFile(null);
    setConverted(false);
    setDownloadUrl('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            file 
              ? 'border-green-400 bg-green-50 dark:bg-green-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => !file && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".html,text/html"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {file ? (
            <div className="space-y-4">
              <FileText className="w-16 h-16 text-green-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {file.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetConverter();
                }}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                选择其他文件
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-16 h-16 text-gray-400 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  上传HTML文件
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  拖拽文件到这里或点击选择文件
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  支持.html文件格式
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="mt-6">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <Settings className="w-4 h-4" />
            转换设置
          </button>
          
          {showSettings && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    宽度 (px)
                  </label>
                  <input
                    type="number"
                    value={settings.width}
                    onChange={(e) => setSettings({...settings, width: parseInt(e.target.value) || 1920})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    min="100"
                    max="4000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    高度 (px)
                  </label>
                  <input
                    type="number"
                    value={settings.height}
                    onChange={(e) => setSettings({...settings, height: parseInt(e.target.value) || 1080})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    min="100"
                    max="4000"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          {!converted ? (
            <button
              onClick={convertToPng}
              disabled={!file || converting}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
            >
              <ImageIcon className="w-5 h-5" />
              {converting ? '转换中...' : '转换为PNG'}
            </button>
          ) : (
            <>
              <button
                onClick={downloadImage}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                <Download className="w-5 h-5" />
                下载PNG
              </button>
              <button
                onClick={resetConverter}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                重新转换
              </button>
            </>
          )}
        </div>

        {/* Preview */}
        {converted && downloadUrl && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              预览
            </h3>
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <img
                src={downloadUrl}
                alt="转换结果"
                className="w-full h-auto max-h-96 object-contain bg-gray-50 dark:bg-gray-700"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
