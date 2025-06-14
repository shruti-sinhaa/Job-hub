"use client";
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useParams, useNavigate } from 'react-router-dom';

const APPLY_FOR_JOB = gql`
  mutation ApplyForJob($jobId: ID!, $name: String!, $qualification: String!, $email: String!, $phoneNumber: String!, $resume: String!) {
    applyForJob(jobId: $jobId, name: $name, qualification: $qualification, email: $email, phoneNumber: $phoneNumber, resume: $resume) {
      id
      status
      job {
        title
        company
      }
      user {
        username
        email
      }
    }
  }
`;

function Apply() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applyForJob, { data, loading, error }] = useMutation(APPLY_FOR_JOB);

  // New state variables for the form fields
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [resume, setResume] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setResume(reader.result); // Set the base64 string
    };
    if (file) {
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const handleApply = async () => {
    try {
      await applyForJob({ variables: { jobId, name, qualification, email, phoneNumber, resume } });
      alert("Application submitted successfully!");
      navigate('/job-seeker');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-black flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Apply for Job</h1>
        {loading && <p>Submitting application...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div>
            <p>Application Status: {data.applyForJob.status}</p>
            <p>Job Title: {data.applyForJob.job.title}</p>
            <p>Company: {data.applyForJob.job.company}</p>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm text-black">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded" placeholder="Your Name" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-black">Qualification</label>
          <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} className="w-full p-2 border border-gray-300 rounded" placeholder="Your Qualification" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-black">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded" placeholder="Your Email" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-black">Phone Number</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-2 border border-gray-300 rounded" placeholder="Your Phone Number" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-black">Resume</label>
          <input type="file" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <button
          onClick={handleApply}
          className="mt-4 bg-blue-500 text-white font-medium py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out active:bg-blue-700 active:border-blue-800"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default Apply; 