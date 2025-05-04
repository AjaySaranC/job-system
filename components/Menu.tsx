'use client';
import React, { useState } from 'react';

interface MenuProps {
  onSearchChange: (query: string) => void;
  onLocationChange: (location: string) => void;
  onJobTypeChange: (jobType: string) => void;
}

const Menu = ({ onSearchChange, onLocationChange, onJobTypeChange }: MenuProps) => {
  const [salary, setSalary] = useState<number>(50000);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [jobTypeQuery, setJobTypeQuery] = useState('');

  const jobTypes = ['FullTime', 'PartTime', 'Internship'];
  const locationTypes = ['Onsite', 'Hybrid', 'WorkFromHome', 'Remote'];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocationQuery(value);
    onLocationChange(value);
  };

  const handleJobTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setJobTypeQuery(value);
    onJobTypeChange(value);
  };

  return (
    <div className="w-full p-2 mt-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col md:flex-row w-full">
        {/* Column 1 - Search */}
        <div className="flex-1 mx-2 p-4 md:p-6 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search By Job Title, Role"
              className="flex-1 px-3 py-2 rounded-md focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="hidden md:block h-auto w-[1.5px] bg-gray-200"></div>

        {/* Column 2 - Location */}
        <div className="flex-1 mx-2 p-4 md:p-6 rounded-lg">
          <div className="flex items-center gap-3 relative w-full">
            <div className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <select
              className="flex-1 px-3 py-2 rounded-md focus:outline-none bg-white"
              value={locationQuery}
              onChange={handleLocationChange}
            >
              <option value="">Preferred Location</option>
              {locationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden md:block h-auto w-[1.5px] bg-gray-200"></div>

        {/* Column 3 - Job Type */}
        <div className="flex-1 mx-2 p-4 md:p-6 rounded-lg">
          <div className="flex items-center gap-3 relative w-full">
            <div className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 1c-2.5 0-6 1.25-6 3.75V18h12v-2.25c0-2.5-3.5-3.75-6-3.75z"
                />
              </svg>
            </div>
            <select
              className="flex-1 px-3 py-2 rounded-md focus:outline-none bg-white"
              value={jobTypeQuery}
              onChange={handleJobTypeChange}
            >
              <option value="">Job type</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden md:block h-auto w-[1.5px] bg-gray-200"></div>

        {/* Column 4 - Salary */}
        <div className="flex-1 mx-2 p-4 md:p-6 rounded-lg">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-start mb-2">
              <div className="font-semibold text-black">Salary Per Month</div>
              <div className="text-black text-sm">
                ₹50,000 - ₹{salary.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center gap-3 w-full">
              <input
                type="range"
                min={50000}
                max={100000}
                step={10000}
                value={salary}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSalary(Number(e.target.value))
                }
                className="w-full accent-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;