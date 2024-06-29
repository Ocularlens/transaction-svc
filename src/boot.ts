import fastify from "fastify";
import config from "./config";
import baseRoutes from "./routes/baseRoute";
import categoryRoutes from "./routes/categoryRoute";
import transactionConsumer from "./service/consumerService";
import connectToDatabase from "./service/databaseService";

const server = fastify({ logger: true });

server.register(baseRoutes, { prefix: "/transaction" });
server.register(categoryRoutes, { prefix: "/category" });

const startServer = async () => {
  try {
    await connectToDatabase();
    await transactionConsumer();
    await server.listen({ port: config.PORT });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

startServer();
