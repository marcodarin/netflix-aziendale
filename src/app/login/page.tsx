"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Reset error message

    // Leggi le credenziali dalle variabili d'ambiente
    const correctUser = process.env.NEXT_PUBLIC_AUTH_USER;
    const correctPass = process.env.NEXT_PUBLIC_AUTH_PASS;

    if (!correctUser || !correctPass) {
      console.error("Errore: Variabili d'ambiente per l'autenticazione non impostate!");
      setError("Errore di configurazione del sistema. Contatta l'amministratore.");
      return;
    }

    // Verifica le credenziali
    if (username === correctUser && password === correctPass) {
      // Login riuscito
      console.log('Login successful');
      try {
        sessionStorage.setItem('isLoggedIn', 'true');
        router.push('/'); // Reindirizza alla homepage
      } catch (storageError) {
        console.error('Failed to set sessionStorage:', storageError);
        setError('Impossibile salvare lo stato di login. Assicurati che sessionStorage sia abilitato.');
      }
    } else {
      // Login fallito
      setError('Credenziali non valide.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Accedi al Video Hub</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150"
          >
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
} 