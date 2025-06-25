import mongoose from "mongoose";

async function db() {
  try {
    let conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "Error connecting with mongodb"
    );
  }
}

export default db;
