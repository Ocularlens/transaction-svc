import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import config from "../config";

const client = new S3Client({
  credentials: {
    accessKeyId: config.ACCESSKEY,
    secretAccessKey: config.SECRETKEY,
  },
  region: "ap-southeast-1",
});

export const uploadFile = async (fileBuffer: Buffer, extension: string) => {
  try {
    const key = uuidv4() + "." + extension;
    const input: PutObjectCommandInput = {
      Bucket: config.BUCKETNAME,
      Key: key,
      Body: fileBuffer,
    };

    const command = new PutObjectCommand(input);
    console.log(`Uploading file: ${key}`);
    await client.send(command);
    return key;
  } catch (error) {
    throw error;
  }
};
