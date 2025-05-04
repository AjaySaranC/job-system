'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export const CreateJobForm = ({ isOpen, onSuccess }: { isOpen: boolean; onSuccess?: () => void }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'FullTime',
    salary: '',
    description: '',
    posted: '24h Ago',
    experience: '',
  });

  useEffect(() => {
    setIsVisible(isOpen);
    // Load draft from localStorage (if exists)
    const savedData = sessionStorage.getItem('jobFormDraft');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      // Save the updated form data to sessionStorage
      sessionStorage.setItem('jobFormDraft', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    onSuccess?.();
  };

  const handleSaveDraft = () => {
    sessionStorage.setItem('jobFormDraft', JSON.stringify(formData)); // Save form data to sessionStorage
    alert('Job draft saved!');
    handleClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const jobCollection = collection(db, 'jobs');
      await addDoc(jobCollection, {
        ...formData,
        description: formData.description.split('\n'),
        createdAt: new Date(),
      });

      alert('Job posted successfully!');
      sessionStorage.removeItem('jobFormDraft'); // Clear draft after submission
      handleClose();
    } catch (error) {
      console.error('Error adding job:', error);
      alert('Error posting job');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/30" onClick={handleClose} />
      <div className="relative bg-white rounded-xl w-full max-w-5xl max-h-[90vh] mx-4 p-6 md:p-8 shadow-2xl overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl text-center font-bold mb-6">Create Job Opening</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select location</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
                <option value="Work From Home">Work From Home</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Salary</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter salary range or amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 2+ years"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter job description (each paragraph on a new line)"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
              onClick={handleSaveDraft}
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-[#0b75ff] text-white hover:bg-[#095cd6] transition-colors"
            >
              Publish Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
