const p1 = new Promise((resolve, reject) =>
  setTimeout(() => {
    reject("Rejected After 1000ms");
  }, 1000),
);
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("resolve after 2000ms");
  }, 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("resolve after 3000ms");
  }, 3000);
});

Promise.any([p1, p2, p3]).then(console.log).catch(console.error);

//

// const obj = {
//   name: "John",

//   regular() {
//     console.log(this.name);
//   },

//   arrow: (this) => {
//     console.log(this);
//   },
// };

// obj.regular

class Animal {
  legs = 4;
  speak() {
    console.log("Animal makes a sound");
  }
  propt() {
    console.log(`Animal has ${4} legs`);
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog barks");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Cat meows");
  }
}

const animals = [new Dog(), new Cat(), new Animal()];

animals.forEach((animal) => {
  animal.speak();
  animal.propt() && animal.propt();
});

// const person = {
//   name: "John",
// };

// function greet(age) {
//   console.log(this.name, age);
// }

// const fn = greet.bind(person);

// fn(25);
// fn(30);

// const person = {
//   name: "John",

//   greet() {
//     console.log(this.name);
//   },
// };

// const another = {
//   name: "Alice",
// };

// const fn = person.greet.bind(another);

// person.greet();
// fn();

const person = {
  name: "John",

  greet() {
    console.log(this.name);
  },
};

const greet = person.greet;

greet.call({ name: "Alice" });

const bound = greet.bind(person);

bound.call({ name: "Bob" });
