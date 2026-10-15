'use client';

import HtmlToPngConverter from './components/HtmlToPngConverter';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            HTML to PNG Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload your HTML file and convert it to a high-quality PNG image. 
            Perfect for creating screenshots, documentation, or sharing web designs.
          </p>
        </div>
        <HtmlToPngConverter />
      </div>
    </main>
  );
}
