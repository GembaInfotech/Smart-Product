import mongoose, { Schema } from "mongoose";


// Define vendor schema
const vendors = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

 
  email: {
    type: String,
    required: true,
    
  },
 
  password: {
    type: String,
    required: true,
  },


});

export const Vendors = mongoose.model("vendo", vendors);
