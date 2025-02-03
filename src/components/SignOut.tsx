"use client";

import { useRouter } from 'next/navigation';

export default function SignOutPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    // Add your sign out logic here
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleSignOut}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
