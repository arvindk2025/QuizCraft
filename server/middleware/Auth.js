const jwt = require("jsonwebtoken");
const User = require("../models/User");

// const authMiddleware = (req, res, next) => {
//   let token;

//   // Check if token is present in cookies or Authorization header
//   if (req.cookies.token) {
//     token = req.cookies.token;
//   } else if (req.header("Authorization")) {
//     token = req.header("Authorization").replace("Bearer ", "");
//   }

//   // If no token is provided, return an error
//   if (!token) {
//     return res.status(401).send({ error: "Access denied. No token provided." });
//   }

//   try {
//     // Verify the token using JWT
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach user info to the request object
//     req.user = decoded;

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     // Handle invalid token error
//     res.status(400).send({ error: "Invalid token." });
//   }
// };

const authMiddleware = (req, res, next) => {
  console.log("Authorization header:", req.header("Authorization"));

  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.header("Authorization")) {
    token = req.header("Authorization").replace("Bearer ", "");
  }

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid token." });
  }
};

const adminMiddleware = (req, res, next) => {
  // Ensure the user role is 'admin'
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Access denied." });
  }
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
};
