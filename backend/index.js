const { ApolloServer } = require("apollo-server");
const connectDB = require("./config/config");
const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/index");
const { verifyToken } = require("./utils/jwt");

connectDB();

// app.use(cors({
//     origin:"",
//     credentials:true,
// }))

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      console.log("Received token:", token);
      if (token) {
        try {
          const user = verifyToken(token.replace("Bearer ", ""));
          console.log("Verified user:", user);
          return { user };
        } catch (err) {
          console.error("Token verification error:", err);
          throw new Error("Invalid or expired token.");
        }
      }
      return {}; // Return an empty object if no token is provided
    },
  });

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
