import fastify from "fastify";
import config from "./config";

const server = fastify({ logger: true });

const startServer = async () => {
  try {
    await server.listen({ port: config.PORT });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

startServer();
