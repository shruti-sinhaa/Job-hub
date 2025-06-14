"use client";
import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import image from "@/assets/Sign up-bro.png"

// Define the signup mutation
const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!, $role: String!) {
    register(username: $username, email: $email, password: $password, role: $role) {
      id
      username
      email
      role
      token
    }
  }
`;

export default function SignupFormDemo() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Job Seeker"); // Default role
  const [registerUser] = useMutation(REGISTER_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({ variables: { username, email, password, role } });
      console.log("Signup successful:", data.register);
      localStorage.setItem('token', data.register.token);
      alert("Signup successful!");
      navigate(data.register.role === "Employer" ? '/employer' : '/jobseeker');
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <img src={image} alt="Signup" className="hidden md:block w-1/2 h-full object-cover" />
      <form className="max-w-md w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h1>
        <div className="mb-4">
          <label className="block text-sm text-gray-300">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-300">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          >
            <option value="Job Seeker">Job Seeker</option>
            <option value="Employer">Employer</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-gray-300">
          Already a user?{" "}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-400 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
