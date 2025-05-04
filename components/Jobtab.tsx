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
}

export default function JobGrid() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobCollection = collection(db, 'jobs');
      const snapshot = await getDocs(jobCollection);
      const jobList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Job[];
      setJobs(jobList);
    };

    fetchJobs();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 lg:max-w-[90em] w-full mx-auto">
      {jobs.map((job, index) => (
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
      ))}
    </div>
  );
}
