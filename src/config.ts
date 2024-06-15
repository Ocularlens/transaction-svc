import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default {
  BUCKETNAME: process.env.BUCKET_NAME,
  ACCESSKEY: process.env.ACCESS_KEY || "",
  SECRETKEY: process.env.SECRET_KEY || "",
  PORT: process.env.PORT as unknown as  number,
  BUCKETREGION: process.env.BUCKET_REGION,
};
