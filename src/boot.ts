import fastify from "fastify";
import multer from "fastify-multer";
import config from "./config";
import baseRoutes from "./routes/baseRoute";

const server = fastify({ logger: true });

server.register(multer.contentParser);

server.register(baseRoutes, { prefix: "/file" });

const startServer = async () => {
  try {
    await server.listen({ port: config.PORT });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

startServer();
