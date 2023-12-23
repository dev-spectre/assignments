function clock(format = 0) {
  const date = new Date();
  let hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  if (format === 1) {
    let isAfterNoon = false;
    if (hour >= 12) {
      isAfterNoon = true;
      hour = hour - 12;
      let postfix = isAfterNoon? "PM" : "AM";
      return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")} ${postfix}`;
    }
  } else {
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
  }
}

setInterval(() => {
  process.stdout.cursorTo(0, 1);
  process.stdout.clearLine(0);
  process.stdout.write(clock(1)+"\n");
}, 500);