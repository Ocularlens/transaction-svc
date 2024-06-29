import { FastifyInstance } from "fastify";

declare module "fastify" {}

async function categoryRoutes(fastify: FastifyInstance) {
  fastify.post('/', {}, () => {
    
  });
}

export default categoryRoutes;
