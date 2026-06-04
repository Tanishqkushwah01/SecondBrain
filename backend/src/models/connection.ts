import mongoose from "mongoose";

export default async function databaseCall() {
   await mongoose.connect(process.env.MONGO_URL!);
   console.log("database is working");
}