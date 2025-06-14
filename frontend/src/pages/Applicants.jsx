"use client";
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import noApplicantsImage from '@/assets/404.png'; // Path to your image

const GET_APPLICANTS = gql`
  query GetApplicants($jobId: ID!) {
    getApplications(jobId: $jobId) {
      id
      name
      qualification
      email
      phoneNumber
      resume
      status
      user {
        username
      }
    }
  }
`;

function Applicants() {
  const { jobId } = useParams();
  const { loading, error, data } = useQuery(GET_APPLICANTS, {
    variables: { jobId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Applicants for Job ID: {jobId}</h1>
      {data.getApplications.length === 0 ? (
        <div className="flex flex-col items-center">
          <img src={noApplicantsImage} alt="No applicants" className="w-64 h-64 mb-4" />
          <p className="text-lg">No applicants have applied for this job yet.</p>
        </div>
      ) : (
        <ul>
          {data.getApplications.map((app) => (
            <li key={app.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <h2 className="text-xl font-semibold">{app.name}</h2>
              <p>Qualification: {app.qualification}</p>
              <p>Email: {app.email}</p>
              <p>Phone Number: {app.phoneNumber}</p>
              <p>Status: {app.status}</p>
              <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-blue-400">View Resume</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Applicants; 