import { Schema, model } from "mongoose";

const personSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
    },
    age: {
      type: Number,
      min: 0, // Age must be a non-negative number
    },
    favoriteFoods: {
      type: [String], // Array of strings
      default: [], // Default to an empty array
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
  },
  { timestamps: true }
);

// modelling the schema create a model from the schema

const person = model("User", personSchema);

export default person;
