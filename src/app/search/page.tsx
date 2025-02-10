'use client';

import { Suspense } from 'react';
import SearchPageContent from '@/context/SearchPageContent';
import SearchPageLoading from '@/components/SearchPageLoading';

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}