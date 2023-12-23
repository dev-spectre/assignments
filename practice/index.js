const express = require("express");
const bodyParser = require("body-parser");
const zod = require("zod");

const app = express();
const port = 3000;

const users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false
      }
    ]
  }
]

app.use(bodyParser.json());

app.get("/", function(req, res) {
  const username = req.query.user;
  const user = getUser(username);
  if (!user) res.status(404).send("User not found");
  const numberOfKidneys = user.kidneys.length;
  const healthy = user.kidneys.reduce((healthyKidneys, kidney) => {
    if (kidney.healthy) return ++healthyKidneys;
    else return healthyKidneys;
  }, 0);

  res.status(200).json({ 
    numberOfKidneys, 
    healthy, 
    unhealthy: numberOfKidneys - healthy
  });
});

app.post("/", function(req, res) {
  const username = req.query.user;
  const body = req.body;
  const user = getUser(username);
  if (!user) res.status(404).send("User not found");
  user.kidneys.push(body);
  res.status(201).json({
    ...user.kidneys
  });
});

app.put("/", function(req, res) {
  const username = req.query.user;
  const user = getUser(username);
  if (!user) res.status(404).send("User not found");
  const numberOfKidneys = user.kidneys.length;
  for (let i = 0; i < numberOfKidneys; i++) {
    user.kidneys[i].healthy = true;
  }
  res.json({
    ...user.kidneys
  });
});

app.delete("/", function(req, res) {
  const username = req.query.user;
  const user = getUser(username);
  if (!user) res.status(404).send("User not found");
  const numberOfKidneys = user.kidneys.length;
  for (let i = 0; i < numberOfKidneys; i++) {
    if (numberOfKidneys > 1 && !user.kidneys[i].healthy) {
      user.kidneys.splice(i, 1);
    }
  }
  res.json({
    ...user.kidneys
  })
});

app.listen(port, () => console.log("App live at port", port));

function getUser(username) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === username) {
        return users[i];
    }
  }
  return;
}