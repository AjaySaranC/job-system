'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { CreateJobForm } from '@/components/CreateJobForm';
import Menu from '@/components/Menu';
import Jobtab from '@/components/Jobtab';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)] relative">
      <div className="mt-[3rem]">
        <Navbar onOpenFormAction={() => setIsFormOpen(true)} />
      </div>
      <div>
        <Menu />
      </div>
      <div>
        <Jobtab />
      </div>
      <CreateJobForm 
        isOpen={isFormOpen} 
        onSuccess={() => setIsFormOpen(false)}
      />
    </div>
  );
}