import {
  GetObjectAclCommandInput,
  GetObjectCommand,
  HeadObjectCommand,
  HeadObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import config from "../config";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  credentials: {
    accessKeyId: config.ACCESSKEY,
    secretAccessKey: config.SECRETKEY,
  },
  region: config.BUCKETREGION,
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

export const fetchFileUrl = async (key: string) => {
  const input: GetObjectAclCommandInput = {
    Bucket: config.BUCKETNAME,
    Key: key,
  };

  const command = new GetObjectCommand(input);

  const url = await getSignedUrl(client, command, { expiresIn: 3600 });

  return url;
};

export const isObjectExist = async (key: string) => {
  const input: HeadObjectCommandInput = {
    Bucket: config.BUCKETNAME,
    Key: key,
  };

  const command = new HeadObjectCommand(input);

  try {
    await client.send(command);

    return true;
  } catch (error) {
    console.log({ error });
    return false;
  }
};
