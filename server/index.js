const express = require("express");
const app = express();
require("dotenv").config();

const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");

const database = require("./config/database");

const cors = require("cors");
app.use(cors({
  origin: 'https://quizcraft1.netlify.app',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true  
}));

const PORT = process.env.PORT || 3000;

// connect to db
database.connectToDB();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

app.use("/api/v1/", routes);

// activate server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
