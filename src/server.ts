import mongoose from "mongoose";
import config from "./config";
import app from "./app";

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log("app is running on port ", config.port);
    });
  } catch (err) {
    console.log(err);
  }
}
