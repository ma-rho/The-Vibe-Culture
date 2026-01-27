'use client';

import { useEffect, useState, ComponentType } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'; 
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/**
 * Higher-Order Component to protect admin routes.
 * Replaces NextAuth useSession logic with Firebase onAuthStateChanged.
 */
export default function withAdminAuth<P extends object>(
  Component: ComponentType<P>
) {
  return function ProtectedRoute(props: P) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      // Observer for Firebase auth state
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) {
          router.push('/admin/login');
        } else {
          setUser(currentUser);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <Loader2 className="animate-spin text-purple-500" size={48} />
        </div>
      );
    }

    // Only render the component if a user is authenticated
    return user ? <Component {...props} /> : null;
  };
}