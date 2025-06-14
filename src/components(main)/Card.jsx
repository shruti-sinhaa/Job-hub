"use client";
import React from "react";
import PropTypes from 'prop-types';

function Card({ title, company, location, description, salary }) {
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105 hover:shadow-gradient">
      <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
      <p className="text-gray-400 mb-1"><strong>Company:</strong> {company}</p>
      <p className="text-gray-400 mb-1"><strong>Location:</strong> {location}</p>
      <p className="text-gray-400 mb-1"><strong>Salary:</strong> ${salary}</p>
      <p className="text-gray-400 mb-4"><strong>Description:</strong> {description}</p>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  salary: PropTypes.number.isRequired,
};

export default Card;
