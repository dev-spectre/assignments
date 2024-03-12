const jwt = require("jsonwebtoken");
const jwtpassword = "superSeceretJWTpassword";

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  let token = req.headers["x-access-token"] || req.headers["authorization"];

  token = token.replace(/^Bearer\s+/, "");

  if (token) {
    jwt.verify(token, jwtpassword, (err, decoded) => {
      if (err) {
        return res.json({
          message: "Token is not valid",
        });
      }
      req.token = decoded;
      next();
    });
  } else {
    return res.json({
      message: "Token not provided",
    });
  }
}

module.exports = userMiddleware;
