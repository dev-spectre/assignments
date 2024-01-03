const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

const app = express();
const PORT = 3005;

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.all("*", function(req, res) {
    res.status(404).json({ message: "Couldn't find what you were looking for" });
})

app.use(function(err, req, res, next) {
    res.status(500).json({
        error: err,
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
