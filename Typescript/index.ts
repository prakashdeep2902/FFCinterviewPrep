let name2: string = "Prakash";
console.log(`Hello ${name2}`);

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
  console.log(value);
  return value;
};

const result = user({
  name: "prakaash",
  age: "24",
  fetures: ["faire in colour", 6.5, false],
  job: "SDE",
});

console.log(result);
