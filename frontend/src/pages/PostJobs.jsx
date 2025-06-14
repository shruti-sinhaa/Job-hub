"use client";
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useNavigate } from 'react-router-dom';

const POST_JOB = gql`
  mutation PostJob($title: String!, $company: String!, $description: String!, $salary: Float!, $location: String!) {
    postJob(title: $title, company: $company, description: $description, salary: $salary, location: $location) {
      id
      title
      company
      location
      salary
      description
    }
  }
`;

function PostJobs() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [postJob] = useMutation(POST_JOB);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await postJob({ variables: { title, company, description, salary: parseFloat(salary), location } });
      console.log("Job posted successfully:", data.postJob);
      alert("Job posted successfully!");
      navigate('/employer'); // Redirect to employer page or job listing
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job: " + error.message);
      navigate('/employer'); // Redirect to Employer page on error
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Post a Job</h1>
        <div className="mb-4">
          <label className="block text-sm">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Company</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Salary</label>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJobs; 