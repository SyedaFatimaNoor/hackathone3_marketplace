"use client";

import { UserProfile, useUser } from '@clerk/nextjs';

const UserProfileComponent = () => {
  const { isSignedIn } = useUser(); // Check if the user is signed in

  if (!isSignedIn) {
    return null; // Don't render anything if the user is not signed in
  }

  return (
    <div className="flex items-center justify-center">
      <UserProfile />
    </div>
  );
};

export default UserProfileComponent;
