import mongoose, { Schema } from "mongoose";

const BusinessQueriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  mob: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// Create model
export const BusinessQueries = mongoose.model(
  "BusinessQueries",
  BusinessQueriesSchema
);