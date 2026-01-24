'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, ComponentType, ReactElement } from 'react';

// Use ComponentType to represent a React component
export default function withAdminAuth<P extends object>(
  Component: ComponentType<P>
) {
  return function WithAdminAuth(props: P): ReactElement | null {
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === 'loading') return;
      if (!session) redirect('/admin/login');
    }, [session, status]);

    if (status === 'loading' || !session) {
      return null; // Or a loading spinner
    }

    return <Component {...props} />;
  };
}