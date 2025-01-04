const express = require("express");
const app = express();
require("dotenv").config();

const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");

const database = require("./config/database");

const cors = require("cors");
app.use(cors({ origin: 'http://localhost:5173' }));

const PORT = process.env.PORT || 3000;

// connect to db
database.connectToDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    maxAge: 14400,
  })
);

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
