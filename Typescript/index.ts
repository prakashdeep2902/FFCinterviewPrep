let name2: string = "Prakash";
// console.log(`Hello ${name2}`);

//

interface person {
  name: string;
  age: string | number;
  fetures: [string, number, boolean];
}

interface userType extends person {
  job: string;
}

const user = (value: userType): userType => {
  return value;
};

const result = user({
  name: "prakaash",
  age: "24",
  fetures: ["faire in colour", 6.5, false],
  job: "SDE",
});

// console.log(result);

function getValue<T>(value: T): T {
  return value;
}

console.log(getValue("getValue"));
console.log(getValue(12));
console.log(getValue([12, 17, 10]));

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface User {
  id: number;
  name: string;
}

const response: ApiResponse<User> = {
  success: true,
  data: {
    id: 1,
    name: "Prakash",
  },
};

interface User {
  id: number;
  name: string;
}

function printUser<T extends User>(user: T) {
  console.log(user);
}

printUser({ id: 123, name: "prakaash", age: 25 });

interface Person2 {
  id: number;
  name: string;
  Mnumber: number;
}

function show(person: Person2, key: keyof Person2): any {
  return person[key];
}

const userbig = {
  id: 1,
  name: "Prakash",
  Mnumber: 8051288351,
};

console.log(show(userbig, "name"));

interface Animal {
  name: string;
  type: string;
  numberOfPopulation: number;
}

function showAnimal(animal: Pick<Animal, "type" | "numberOfPopulation">) {
  console.log("animal:::==>", animal);
}

const animal = {
  name: "Lion",
  type: "carnivorus",
  numberOfPopulation: 1234,
};

showAnimal({ numberOfPopulation: 1234, type: "carnivorus" });

function display(value: string): string;
function display(value: number): number;

function display(value: any): any {
  return value;
}

display("Hello");
display(100);

console.log("==>", display("Hello"));
console.log("display(100);", display(100));
