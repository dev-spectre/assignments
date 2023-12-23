const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const app = express();

const PORT = 3005

// Middleware for parsing request bodies
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use(bodyParser.json());

<<<<<<< Updated upstream
const PORT = 3000;
=======
app.use(function(err, req, res, next) {
    res.status(500).send("Oops!! Something went wrong.")
});

app.all("*", function(req, res) {
    res.status(404).send("Can't find what you are looking for.")
})
>>>>>>> Stashed changes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
