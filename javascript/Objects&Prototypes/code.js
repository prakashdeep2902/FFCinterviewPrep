// A constructor function is a regular function used with the new keyword to create and initialize objects.

const person = {
  greet() {
    console.log("Hello");
  },
};

const user = Object.create(person);
user.name = "John";
user.greet();

class users {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`hi my name is ${this.name} and my Age is ${this.age}`);
  }
}

const u = new users("prakash", 25);

u.greet();

// inharitance

class Animal {
  constructor(feature) {
    this.legs = feature.legs;
    this.eye = feature.eye;
  }
}

class Dog extends Animal {
  constructor(sound) {
    super(feature); // call parent constructor
    this.sound = sound;
  }

  showFeatureOfDog() {
    console.log(
      `A dog is ${this.sound} and it has ${this.eye} eyes and ${this.legs} legs.`,
    );
  }
}

const feature = {
  legs: 4,
  eye: 2,
};

const d = new Dog("Barking");

d.showFeatureOfDog();

const a = new Animal(feature);
console.log(a);
