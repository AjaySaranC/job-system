// pages/admin/upload.tsx
import { useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const jobs = [
    {
      company: "Amazon",
      title: "Full Stack Developer",
      posted: "24h Ago",
      experience: "1-3 yr Exp",
      type: "Onsite",
      salary: "12LPA",
      description: [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      company: "Tesla",
      title: "Node Js Developer",
      posted: "24h Ago",
      experience: "1-3 yr Exp",
      type: "Onsite",
      salary: "12LPA",
      description: [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      company: "Swiggy",
      title: "UX/UI Designer",
      posted: "24h Ago",
      experience: "1-3 yr Exp",
      type: "Onsite",
      salary: "12LPA",
      description: [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      company: "Amazon",
      title: "Full Stack Developer",
      posted: "24h Ago",
      experience: "1-3 yr Exp",
      type: "Onsite",
      salary: "12LPA",
      description: [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      company: "Tesla",
      title: "Node Js Developer",
      posted: "24h Ago",
      experience: "1-3 yr Exp",
      type: "Onsite",
      salary: "12LPA",
      description: [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      company: "Swiggy",
      title: "UX/UI Designer",
      posted: "24h Ago",
      experience: "1-3 yr Exp",
      type: "Onsite",
      salary: "12LPA",
      description: [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      company: "Amazon",
      title: "Full Stack Developer",
      posted: "24h Ago",
      experience: "1-3 yr Exp",
      type: "Onsite",
      salary: "12LPA",
      description: [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      company: "Tesla",
      title: "Node Js Developer",
      posted: "24h Ago",
      experience: "1-3 yr Exp",
      type: "Onsite",
      salary: "12LPA",
      description: [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    }
  ];

export default function UploadJobsPage() {
  useEffect(() => {
    const uploadJobs = async () => {
      const jobCollection = collection(db, 'jobs');
      try {
        for (const job of jobs) {
          await addDoc(jobCollection, job);
        }
        console.log('Jobs uploaded to Firestore');
      } catch (error) {
        console.error('Failed to upload jobs:', error);
      }
    };

    uploadJobs();
  }, []);

  return (
    <div className="text-center p-10 text-lg font-semibold">
      Uploading jobs to Firestore...
    </div>
  );
}
