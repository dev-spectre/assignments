const fs = require("fs");

fs.readFile("./4-write-to-file.md", "utf-8", (err, data) => {
  fs.writeFile("./4-write-to-file.md",  data + "\nI Was Here", "utf-8", (err) => {
    if (err) throw err;
    console.log("Done");
  });
});