'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoggedInState, setIsLoggedInState] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedInState(loggedIn);

    if (!loggedIn && pathname !== '/login') {
      console.log('AuthGuard: User not logged in, redirecting to /login from', pathname);
      router.replace('/login');
    } else {
      // Se loggato o se siamo già sulla pagina di login, consideriamo verificato
      setIsVerified(true);
    }
  }, [router, pathname]);

  // Mostra loading/null finché la verifica non è completa
  if (!isVerified) {
    return null; // O un componente di caricamento
  }

  // Se verificato E siamo sulla pagina di login, mostra solo i figli (la pagina di login stessa)
  if (pathname === '/login') {
      return <>{children}</>;
  }

  // Se verificato, loggato E NON siamo sulla pagina di login, mostra i figli (contenuto protetto + Header)
  if (isLoggedInState) {
    return <>{children}</>;
  }

  // Fallback: non dovrebbe essere raggiunto se la logica sopra è corretta
  return null;
} 