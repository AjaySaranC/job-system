'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { CreateJobForm } from '@/components/CreateJobForm';
import Menu from '@/components/Menu';
import Jobtab from '@/components/Jobtab';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [jobTypeQuery, setJobTypeQuery] = useState('');

  return (
    <div className={`flex flex-col min-h-screen relative ${roboto.className}`}>
      <div className="mt-[3rem]">
        <Navbar onOpenFormAction={() => setIsFormOpen(true)} />
      </div>
      <div>
        <Menu 
          onSearchChange={setSearchQuery}
          onLocationChange={setLocationQuery}
          onJobTypeChange={setJobTypeQuery}
        />
      </div>
      <div>
        <Jobtab 
          searchQuery={searchQuery}
          locationQuery={locationQuery}
          jobTypeQuery={jobTypeQuery}
        />
      </div>
      <CreateJobForm 
        isOpen={isFormOpen} 
        onSuccess={() => setIsFormOpen(false)}
      />
    </div>
  );
}