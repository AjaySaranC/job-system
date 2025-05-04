import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User, Building2, Layers } from 'lucide-react';

interface Job {
  id?: string;
  company: string;
  title: string;
  posted: string;
  experience: string;
  location: string;
  salary: string;
  description: string[];
  type?: string;
}

interface JobtabProps {
  searchQuery: string;
  locationQuery: string;
  jobTypeQuery: string;
}

export default function Jobtab({ searchQuery, locationQuery, jobTypeQuery }: JobtabProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobCollection = collection(db, 'jobs');
      const snapshot = await getDocs(jobCollection);
      const jobList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Job[];
      setJobs(jobList);
      setFilteredJobs(jobList);
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job => {
      // Search by title or company
      const matchesSearch = searchQuery === '' || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by location
      const matchesLocation = locationQuery === '' || 
        job.location.toLowerCase().includes(locationQuery.toLowerCase());
      
      // Filter by job type
      const matchesJobType = jobTypeQuery === '' || 
        (job.type && job.type.toLowerCase().includes(jobTypeQuery.toLowerCase()));
      
      return matchesSearch && matchesLocation && matchesJobType;
    });
    
    setFilteredJobs(filtered);
  }, [searchQuery, locationQuery, jobTypeQuery, jobs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 lg:max-w-[90em] w-full mx-auto">
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="bg-gray-100 shadow-2xl p-2 rounded-xl">
                  <img
                    src={
                      job.company === "Amazon"
                        ? "/amazon.png"
                        : job.company === "Tesla"
                        ? "/tesla.png"
                        : "/swiggy.png"
                    }
                    alt="Company Logo"
                    className="w-16 h-16 rounded-full object-contain"
                  />
                </div>
                <div className="bg-blue-200 text-black text-base px-2 py-0.5 rounded">
                  {job.posted}
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-semibold">{job.title}</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <span className="flex items-center gap-1">
                <User size={16} /> {job.experience}
              </span>
              <span className="flex items-center gap-1">
                <Building2 size={16} /> {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Layers size={16} /> {job.salary}
              </span>
            </div>

            <ul className="text-sm text-gray-700 mt-3 list-disc pl-5">
              {job.description.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
            <button className="mt-4 bg-blue-500 text-white py-2 px-6 w-full rounded-md hover:bg-blue-600">
              Apply Now
            </button>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500 text-lg">No jobs found matching your criteria</p>
        </div>
      )}
    </div>
  );
}