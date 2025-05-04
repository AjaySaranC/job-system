'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Successfully logged in!');
      // Clear form fields after successful login
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(getUserFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getUserFriendlyError = (code: string) => {
    switch (code) {
      case 'auth/invalid-email': return 'Invalid email address';
      case 'auth/user-not-found': return 'No account found with this email';
      case 'auth/wrong-password': return 'Incorrect password';
      default: return 'Login failed. Please try again.';
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      {error && (
        <div className="text-red-500 p-3 bg-red-50 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="text-green-600 p-3 bg-green-50 rounded-lg text-sm">
          {success}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        className="border px-3 py-2 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border px-3 py-2 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}