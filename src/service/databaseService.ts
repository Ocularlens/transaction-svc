import { connect } from "mongoose";
import config from "../config";

async function connectToDatabase() {
  await connect(config.MONGO_URL);
}

export default connectToDatabase;
