"use client";
import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import image from "@/assets/Login-pana.png"

// Define the login mutation
const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
      role
      token
    }
  }
`;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { email, password } });
      console.log("Login successful:", data.login);
      localStorage.setItem('token', data.login.token);
      alert("Login successful!");
      navigate(data.login.role === "Employer" ? '/employer' : '/jobseeker');
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <img src={image} alt="Login" className="hidden md:block w-1/2 h-full object-cover" />
      <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Login</h1>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-300">
          Not a user yet?{" "}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-400 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
