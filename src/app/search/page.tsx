'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        {query ? (
          <p>Results for: {query}</p>
        ) : (
          <p>Please enter a search query</p>
        )}
      </div>
    </Suspense>
  );
}