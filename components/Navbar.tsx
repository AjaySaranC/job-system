'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const navLinkStyle = `
  transition-all duration-200 ease-in-out 
  hover:scale-105 
  hover:shadow-md 
  hover:-translate-y-0.5 
  active:scale-100
  p-2 rounded-lg
`;

export default function Navbar({ onOpenFormAction }: { onOpenFormAction: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setIsLoginView(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCreateJobClick = () => {
    if (!user) {
      setShowLoginPrompt(true);
      toggleModal(); // Open login modal
    } else {
      onOpenFormAction();
    }
  };

  return (
    <div>
      <nav className="w-[90%] md:w-[68%] mx-auto py-4 rounded-full font-medium backdrop-blur-sm shadow-[0_0_25px_-3px_rgba(0,0,0,0.2)] transition-shadow duration-300">
        <div className="flex justify-evenly items-center px-4">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>
  
          <Link href="/home" className={navLinkStyle}>Home</Link>
          <Link href="/about" className={navLinkStyle}>Find Jobs</Link>
          <Link href="/services" className={navLinkStyle}>Find Talents</Link>
          <Link href="/blog" className={navLinkStyle}>About us</Link>
          <Link href="/contact" className={navLinkStyle}>Testimonials</Link>
  
          {/* Create Job + Login (hover transition) */}
          <div className="relative group h-[42px] w-[130px] overflow-hidden rounded-full ml-2">
            {!user ? (
              <>
                <button
                  onClick={handleCreateJobClick}
                  className="absolute inset-0 bg-gradient-to-b from-[#9420EE] to-[#730bc4] text-white w-full h-full transition-transform duration-300 transform group-hover:-translate-y-full"
                >
                  Create Job
                </button>
                <button
                  onClick={toggleModal}
                  className="absolute inset-0 bg-gradient-to-b from-[#9420EE] to-[#730bc4] text-white w-full h-full transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={onOpenFormAction}
                className="bg-gradient-to-r from-[#0b75ff] to-[#3d36fb] text-white w-full h-full rounded-full"
              >
                Create Job
              </button>
            )}
          </div>
  
          {/* Logout button (only when user is logged in) */}
          {user && (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#0b75ff] to-[#3d36fb] text-white transition-colors hover:opacity-90"
            >
              Log Out
            </button>
          )}
        </div>
      </nav>
  
      {/* Login Prompt Toast */}
      {showLoginPrompt && !user && (
        <div className="fixed top-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg z-50">
          <p>Please login to create a job</p>
          <button 
            onClick={() => setShowLoginPrompt(false)}
            className="mt-2 text-yellow-700 hover:text-yellow-900"
          >
            ×
          </button>
        </div>
      )}
  
      {/* Auth Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px] relative">
            <button
              onClick={() => {
                toggleModal();
                setShowLoginPrompt(false);
              }}
              className="absolute top-2 right-3 text-xl font-bold"
            >
              ×
            </button>
  
            <div className="flex justify-between mb-4">
              <button
                onClick={() => setIsLoginView(true)}
                className={`w-1/2 p-2 ${
                  isLoginView ? 'font-semibold border-b-2 border-blue-500' : 'text-gray-500'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLoginView(false)}
                className={`w-1/2 p-2 ${
                  !isLoginView ? 'font-semibold border-b-2 border-blue-500' : 'text-gray-500'
                }`}
              >
                Register
              </button>
            </div>
  
            {isLoginView ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      )}
    </div>
  );
}