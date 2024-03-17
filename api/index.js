const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Transaction = require('./models/Transaction.js');
const { default: mongoose } = require("mongoose");

const app = express();
const port = 3001;

const uri = process.env.MONGO_URL;

// Function to establish a persistent connection to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB database connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    process.exit(1); // Exit the application on connection failure
  }
}

// Connect to MongoDB before starting the server
connectToDatabase();

app.use(cors());
app.use(express.json());

// Route to handle data retrieval (GET request)
app.get("/api/transaction", async (req, res) => {
  try {
    // Retrieve all transactions from MongoDB
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to handle data submission (POST request)
app.post("/api/transaction", async (req, res) => {
  try { 
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.datetime ||
      !req.body.price
    ) {
      res.status(400).send("Missing required fields");
      return;
    }

    // Create a new transaction
    const { name, description, datetime, price } = req.body;
    const transaction = await Transaction.create({
      name,
      description,
      datetime,
      price
    });

    res.json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

// Dynamic Port
// const server = app.listen(0, () => {
//   const port = server.address().port;
//   console.log(`App listening on port http://localhost:${port}${url}`);
// });

// Note: to run the program run nodemon index.js

//QXj2SQe6EHYpvRrr mongo db pass