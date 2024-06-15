import { FastifyInstance } from "fastify";
import multer from "fastify-multer";
import {
  fetchFileUrl,
  isObjectExist,
  uploadFile,
} from "../service/uploadService";

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

      if (!file) return reply.code(400).send({ message: "file required" });

      const filename = await uploadFile(
        file.buffer,
        file.originalname.split(".")[1]
      );

      return reply
        .code(200)
        .send({ message: "file saved in bucket", filename });
    }
  );

  fastify.get<{
    Params: {
      key: string;
    };
  }>("/:key", {}, async (request, reply) => {
    const { key } = request.params;

    const isObjectExistBool = await isObjectExist(key);

    if (!isObjectExistBool)
      return reply.code(404).send({ message: "file not found" });

    const fileUrl = await fetchFileUrl(key);

    return reply.code(200).send({ message: "file url fetched", fileUrl });
  });
}

export default baseRoutes;
