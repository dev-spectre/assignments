const fs = require("fs");

fs.readFile("./3-read-from-file.md", "utf-8", (_, data) => {
  console.log(data);
});

expensiveOperation(10);


function expensiveOperation(level) {
  let currentIteration = 0;
  let iterations = 1000000000 * level;
  for (let i = 0; i < iterations; i++) {
    currentIteration++;
    let percentage = currentIteration / iterations * 100;
    if (
      percentage === 10 ||
      percentage === 20 ||
      percentage === 30 ||
      percentage === 40 ||
      percentage === 50 ||
      percentage === 60 ||
      percentage === 70 ||
      percentage === 80 ||
      percentage === 90 ||
      percentage === 100
    ) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write(percentage.toString()+"%              ");
    }
  }
  process.stdout.clearLine(0);
}