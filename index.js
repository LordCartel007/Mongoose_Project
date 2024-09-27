import dotenv from "dotenv";
dotenv.config();
import express from "express";
// importing mongoose
import mongoose from "mongoose";

import person from "./models/user.model.js";

const app = express();
// THE .THEN HANDLES THE SUCCESS CASE (promises )
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log(`database connected @ ${result.connection.host}`);
  })
  .catch((error) => {
    console.log(`error connecting to database: ${error.message}`);
  });

// creating a user using person model
const newPerson = new person({
  name: "General Zod",
  age: 40,
  favoriteFoods: ["Pizza", "Sushi", "Rice", "Yam"],
  email: "Zod@gmail.com",
  gender: "male",
});

// saving the user to the database
newPerson
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(`error saving users: ${error.message}`);
  });

const arrayOfPeople = [
  {
    name: "Airrack",
    age: 35,
    favoriteFoods: ["Burger", "Fries"],
    email: "airrack@gmail.com",
    gender: "male",
  },
  {
    name: "Bruce Wayne",
    age: 40,
    favoriteFoods: ["Steak", "Caviar"],
    email: "bruce.wayne@gmail.com",
    gender: "male",
  },
  {
    name: "Mr Beast",
    age: 34,
    favoriteFoods: ["Salad", "Fruit", "egg"],
    email: "mrbeast@gmail.com",
    gender: "male",
  },
  {
    name: "Zendaya",
    age: 29,
    favoriteFoods: ["Burger", "Fries", "milk"],
    email: "Zendaya@gmail.com",
    gender: "female",
  },
  {
    name: "Tom Holand",
    age: 28,
    favoriteFoods: ["wine", "beer"],
    email: "TomHoland@gmail.com",
    gender: "male",
  },
  {
    name: "Kal El",
    age: 45,
    favoriteFoods: ["plantain", "custard"],
    email: "KalEl@gmail.com",
    gender: "male",
  },
  {
    name: "Brain Jotter",
    age: 30,
    favoriteFoods: ["shawarma", "yoghurt"],
    email: "BrainJotter@gmail.com",
    gender: "male",
  },
  {
    name: "Ronaldo",
    age: 39,
    favoriteFoods: ["chicken", "noodles"],
    email: "Ronaldo@gmail.com",
    gender: "male",
  },
];

// trying to check result and catch error
person
  .create(arrayOfPeople)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(`error creating users: ${error.message}`);
  });

// finding a user with the name Bruce Wayne
person
  .find({ name: "Bruce Wayne" })
  .then((result) => {
    console.log("People with the name Bruce Wayne:", result);
  })
  .catch((error) => {
    console.log(`error finding users: ${error.message}`);
  });

// finding user with specific food type
const food = "Burger";
person
  .findOne({ favoriteFoods: food })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// finfing a user with a specific id
const personId1 = "66f68b6a43c5bc5ebc6a03ea";
person
  .findById(personId1)
  .then((result) => {
    console.log("the user with that id:", result);
  })
  .catch((error) => {
    console.log(error);
  });

// finding a user with a specific id and updating the user
const personId2 = "66f68b6a43c5bc5ebc6a03ea";
person
  .findById(personId2)
  .then((result) => {
    if (!result) {
      return console.log("Person not found");
    }
    result.favoriteFoods.push("hamburger");
    return result.save();
  })
  .then((result) => {
    console.log("updatedPerson", result);
  })
  .catch((error) => {
    console.log(`Error updating person: ${error.message}`);
  })
  .finally(() => {
    mongoose.connection.close(); // Close the connection
  });

// finding a signgle user and updating age
var personName = "Bruce Wayne";

person
  .findOne({ name: personName })
  .then((result) => {
    if (!result) {
      return console.log("Person not found");
    }
    result.age = 20; // Update age
    return result.save(); // Save the updated document
  })
  .then((updatedPerson) => {
    console.log("Updated person:", updatedPerson);
  })
  .catch((error) => {
    console.log(`Error updating person: ${error.message}`);
  })
  .finally(() => {
    mongoose.connection.close(); // Close the connection
  });

// finding a user with a specific id and removing the user
const personId = "66f68b6a43c5bc5ebc6a03ea";

person
  .findByIdAndDelete(personId)
  .then((result) => {
    if (!result) {
      return console.log("Person not found");
    }
    console.log("Person removed:", result);
  })
  .catch((error) => {
    console.log(`Error removing person: ${error.message}`);
  })
  .finally(() => {
    mongoose.connection.close(); // Close the connection
  });

// deleting many users with the name Mary
person
  .deleteMany({ name: "Mary" })
  .then((result) => {
    console.log("People removed:", result);
  })
  .catch((error) => {
    console.log(`Error removing people: ${error.message}`);
  })
  .finally(() => {
    mongoose.connection.close(); // Close the connection
  });

// Chain Search Query Helpers to Narrow Search Results
person
  .find({ favoriteFoods: "burritos" }) // Find people who like burritos
  .sort({ name: 1 }) // Sort by name (ascending)
  .limit(2) // Limit the results to 2 documents
  .select("-age") // Exclude the age field
  .exec() // Execute the query
  .then((data) => {
    if (data.length === 0) {
      console.log("No users found");
    } else {
      console.log("Found people:", data); // Output the found documents
    }
  })
  .catch((error) => {
    console.log(`Error finding people: ${error.message}`); // Handle any errors
  })
  .finally(() => {
    mongoose.connection.close(); // Close the connection
  });

// creating server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
