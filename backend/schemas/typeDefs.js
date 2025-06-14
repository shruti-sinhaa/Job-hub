const {gql} = require('graphql-tag');

const typeDefs=gql`
    type Job{
        id:ID!
        title:String!
        company:String!
        location:String!
        salary:Float
        description:String!
        postedBy:User!
    }

    type User{
        id:ID!
        username:String!
        email:String!
        role:String!
        token:String
    }

    type Application{
        id:ID!
        job:Job!
        user:User!
        status:String!
        name: String!
        qualification: String!
        email: String!
        phoneNumber: String!
        resume: String!  # URL or path to the uploaded resume
    }

    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        token: String
      }

      extend type Query {
        getApplications(jobId: ID!): [Application!]!  # Fetch applications for a specific job
        getJobs(role: String, salaryRange: String, location: String): [Job!]!
        getJobById(id: ID!): Job
        getUserProfile(id: ID!): User
      }

    type Query{
        getJobs(location:String, salaryRange:String):[Job!]!
        getJobById(id:ID!):Job
        getUserProfile(id:ID!):User
    }

    extend type Mutation {
        applyForJob(jobId: ID!, name: String!, qualification: String!, email: String!, phoneNumber: String!, resume: String!): Application
        updateApplicationStatus(applicationId: ID!, status: String!): Application
    }

    type Mutation {
        postJob(title: String!, company: String!, description: String!, salary: Float!, location: String!): Job
        applyForJob(jobId: ID!): Application
        updateProfile(username: String!, email: String!): User  # <-- This line must exist
        register(username: String!, email: String!, password: String!, role: String!): User
    login(email: String!, password: String!): User
      }
      
    
`;

module.exports=typeDefs;