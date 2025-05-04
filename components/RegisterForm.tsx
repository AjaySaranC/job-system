'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      setSuccess('Account created successfully!');
      console.log('Registered:', userCredential.user);
      
      // Clear form fields after successful registration
      setName('');
      setEmail('');
      setPassword('');

    } catch (err: any) {
      // Convert Firebase errors to user-friendly messages
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Email already in use');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        default:
          setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
        type="text"
        placeholder="Full Name"
        className="border px-3 py-2 rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
        placeholder="Password (min 6 characters)"
        className="border px-3 py-2 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <button
        type="submit"
        disabled={loading}
        className={`mt-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Creating account...' : 'Register'}
      </button>
    </form>
  );
}