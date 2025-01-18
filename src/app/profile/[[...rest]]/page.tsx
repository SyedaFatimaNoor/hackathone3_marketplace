"use client";

import { SignUp, useUser } from "@clerk/nextjs"; // Import useUser
import SignOutComponent from "@/components/SignOut";
import UserProfileComponent from "@/components/UserProfile";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isSignedIn } = useUser(); // Check if the user is signed in
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      // Replace the current history entry to prevent going back to the home page
      window.history.replaceState(null, '', '/profile');
    } else {
      // If the user is not signed in, redirect them to the home page
      router.push("/");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 bg-gray-100">
      <div className="w-full max-w-md">
        <SignUp />
      </div>
      <div className="w-full max-w-md">
        <UserProfileComponent />
      </div>
      <div className="w-full max-w-md">
        <SignOutComponent />
      </div>
    </div>
  );
}