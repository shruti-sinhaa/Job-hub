"use client";
import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Card from '../components(main)/Card';
import { useNavigate } from 'react-router-dom';
import image from '@/assets/404.png';

// Define the query to fetch jobs posted by the employer
const GET_EMPLOYER_JOBS = gql`
  query GetEmployerJobs {
    getJobs {
      id
      title
      company
      location
      salary
      description
    }
  }
`;

function Employer() {
  const { loading, error, data } = useQuery(GET_EMPLOYER_JOBS);
  const navigate = useNavigate();

  const handleAddJob = () => {
    navigate('/post-job');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching jobs:", error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Posted Jobs</h1>
          <div>
            <button
              onClick={handleAddJob}
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out active:bg-blue-700 active:border-blue-800 mr-2"
            >
              Add Jobs
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg focus:outline-none hover:bg-red-600 transition duration-300 ease-in-out active:bg-red-700 active:border-red-800"
            >
              Logout
            </button>
          </div>
        </div>
        {data.getJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.getJobs.map((job) => (
              <div key={job.id} className="p-4 bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p>Company: {job.company}</p>
                <button
                  onClick={() => navigate(`/applicants/${job.id}`)}
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Applicants
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img src={image} alt="No jobs posted" className="w-64 h-64 mb-4" />
            <p>No jobs posted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Employer;
