async function incrementCounter() {
  await wait(1000);
  console.log(counter++);
  incrementCounter()
}

let counter = 0;
incrementCounter();

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}