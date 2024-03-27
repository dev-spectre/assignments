const str: string = "Hello, World";
console.log(str);

function greetUser(name: string) {
  console.log(`Hello, ${name}`);
}

greetUser("Spectre");

function sum(a: number, b: number) {
  return a + b;
}

console.log(sum(5, 10));

function isLegal(user: User): boolean {
  return user.age > 18;
}

console.log(
  isLegal({
    name: "Abhishek Dallas",
    email: "abhishekdallasalpy@gmail.com",
    age: 18,
  })
);

async function delayCall(callback: () => number): Promise<void> {
  await new Promise((res) => setTimeout(res, 100));
  const returnStatus: number = callback();
  console.log(returnStatus);
}

delayCall(() => {
  console.log("Delay call");
  return 0;
});

interface User {
  name: string;
  age: number;
  email?: string;
}

interface Person extends User {
  greet: (name: string) => void;
}

class Employee implements Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(name: string): void {
    console.log(`Hello, ${name}`);
  }
}

const Manager: Person = {
  name: "Abhishek Dallas",
  age: 18,
  email: "abhishekdallasalpy@gmail.com",
  greet: function (name: string) {
    console.log(`Hello, ${name}`);
  },
};
