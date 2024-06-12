import { FastifyInstance } from "fastify";
import multer from "fastify-multer";
import { uploadFile } from "../service/uploadService";

const upload = multer();

declare module "fastify" {
  export interface FastifyRequest {
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      buffer: Buffer;
      size: number;
    };
  }
}

async function baseRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    {
      preHandler: upload.single("file"),
    },
    async (request, reply) => {
      const { file } = request;

      const filename = await uploadFile(
        file.buffer,
        file.originalname.split(".")[1]
      );

      reply.code(200).send({ message: "file saved in bucket", filename });
    }
  );
}

export default baseRoutes;
