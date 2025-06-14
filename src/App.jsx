import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuroraBackgroundDemo } from './components(main)/Aurora-Background';
import SignupFormDemo from './components(main)/signup-form-demo';
import LoginPage from './components(main)/Login';
import JobSeeker from './pages/JobSeeker';
import Employer from './pages/Employer';
import PostJobs from './pages/PostJobs';
import Apply from './pages/Apply';
import Applicants from './pages/Applicants';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<AuroraBackgroundDemo />} />
      <Route path="/signup" element={<SignupFormDemo />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/jobseeker" element={<JobSeeker />} />
      <Route path="/employer" element={<Employer />} />
      <Route path="/post-job" element={<PostJobs />} />
      <Route path="/apply/:jobId" element={<Apply />} />
      <Route path="/applicants/:jobId" element={<Applicants />} />
     
    </Routes>
    </Router>
  );
}

export default App;
