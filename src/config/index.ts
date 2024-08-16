import path from "path";

// connect index file with env file
require("dotenv").config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
