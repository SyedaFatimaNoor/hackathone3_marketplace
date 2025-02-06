'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ClerkAuthHandler() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      toast.success(`Welcome, ${user?.fullName || 'User'}!`, {
        description: 'You are now logged in to Avion',
        duration: 3000,
        position: 'top-right',
      });
    }
  }, [isSignedIn, user]);

  return null;
}
