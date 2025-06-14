"use client";
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Card from '../components(main)/Card';
import { useNavigate } from 'react-router-dom';

// Define the query to fetch all jobs
const GET_JOBS = gql`
  query GetJobs($role: String, $salaryRange: String, $location: String) {
    getJobs(role: $role, salaryRange: $salaryRange, location: $location) {
      id
      title
      company
      location
      salary
      description
    }
  }
`;

function JobSeeker() {
  const [role, setRole] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [location, setLocation] = useState('');
  const [getJobs, { loading, error, data }] = useLazyQuery(GET_JOBS);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all jobs on initial render
    getJobs({ variables: { role: '', salaryRange: '', location: '' } });
  }, [getJobs]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  const handleFilterChange = () => {
    getJobs({ variables: { role, salaryRange, location } }).then((result) => {
      if (result.data.getJobs.length === 0) {
        // If no jobs match the filters, refetch all jobs
        getJobs({ variables: { role: '', salaryRange: '', location: '' } });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">Job Opportunities</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg focus:outline-none hover:bg-red-600 transition duration-300 ease-in-out active:bg-red-700 active:border-red-800"
          >
            Logout
          </button>
        </div>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300">
              Filter by Role:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full bg-gray-800 text-white border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
              {/* Add more roles as needed */}
            </select>
          </div>
          <div>
            <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-300">
              Filter by Salary Range:
            </label>
            <input
              type="text"
              id="salaryRange"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              placeholder="e.g., 50000-100000"
              className="mt-1 block w-full bg-gray-800 text-white border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300">
              Filter by Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., New York"
              className="mt-1 block w-full bg-gray-800 text-white border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleFilterChange}
          className="mb-4 bg-blue-500 text-white font-medium py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out active:bg-blue-700 active:border-blue-800"
        >
          Apply Filters
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data && data.getJobs.map((job) => (
            <div key={job.id} className="mb-4">
              <Card {...job} />
              <button
                onClick={() => handleApply(job.id)}
                className="mt-2 bg-green-500 text-white font-medium py-2 px-4 rounded-lg focus:outline-none hover:bg-green-600 transition duration-300 ease-in-out active:bg-green-700 active:border-green-800"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobSeeker;
