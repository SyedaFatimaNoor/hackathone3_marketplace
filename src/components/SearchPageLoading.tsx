// src/components/SearchPageLoading.tsx
'use client';

import { Search } from 'lucide-react';

export default function SearchPageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <Search className="mx-auto h-16 w-16 text-blue-300 mb-4" />
        </div>
        <p className="text-xl text-gray-600">Loading search results...</p>
      </div>
    </div>
  );
}