const Job = require('../models/Job');

const jobResolver = {
  Query: {
    getJobs: async (_, { role, salaryRange, location }) => {
      const query = {};
      if (role) {
        query.role = role;
      }
      if (salaryRange) {
        const [minSalary, maxSalary] = salaryRange.split('-').map(Number);
        query.salary = { $gte: minSalary, $lte: maxSalary };
      }
      if (location) {
        query.location = location;
      }
      const jobs = await Job.find(query).sort({ createdAt: -1 });
      return jobs.map((job) => ({
        id: job._id.toString(),
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        description: job.description,
      }));
    },
  },
  Mutation: {
    postJob: async (_, { title, company, description, salary, location }, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      const newJob = new Job({ title, company, description, salary, location, postedBy: user.id });
      return await newJob.save();
    },
  },
};

module.exports = jobResolver;
  