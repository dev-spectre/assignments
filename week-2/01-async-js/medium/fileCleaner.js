const fs = require("fs");

fs.readFile("./file.txt", "utf-8", (err, data) => {
  let newData = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i] != " " || newData[newData.length-1] != " ") {
      newData += data[i];
    }
  }
  fs.writeFile("./file.txt", newData, "utf-8", (err) => {
    if (err) throw err;
    console.log("File Modified");
    console.log("New contetent:\n", newData);
  })
})