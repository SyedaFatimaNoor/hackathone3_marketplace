"use client";

import { SignedOut } from "@clerk/nextjs";

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignedOut>
        <p className="text-lg font-semibold text-gray-700">
          You have been signed out successfully.
        </p>
      </SignedOut>
    </div>
  );
}
