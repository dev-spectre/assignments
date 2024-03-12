const { Admin } = require("../db/index");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
    const existingUser = await Admin.findOne({ username, password });
    if (existingUser) {
        next();
    } else {
        res.status(403).send("User doesn't exist");
    }
}

module.exports = adminMiddleware;