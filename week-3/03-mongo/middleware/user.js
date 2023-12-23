const { User } = require("../db/index.js");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
    const existingUser = await User.findOne({ username, password });
    if (existingUser) {
        next();
    } else {
        res.status(403).send("User doesn't exist");
    }
}

module.exports = userMiddleware;