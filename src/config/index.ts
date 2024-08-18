import path from "path";

// connect index file with env file
require("dotenv").config({ path: path.join(process.cwd(), ".env") });

export default {
  // eslint-disable-next-line no-undef
  port: process.env.PORT,
  // eslint-disable-next-line no-undef
  database_url: process.env.DATABASE_URL,
};
