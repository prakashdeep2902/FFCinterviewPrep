// es6 class
class user {
  constructor(name, age) {
    ((this.name = name), (this.age = age));
  }

  greet = function () {
    console.log(`hi my name is ${this.name} and my age is ${this.age}`);
  };
}

const u = new user("prakash", 24);

u.greet();

//under the hood it working with prototype and constructor

function user2(name, age) {
  ((this.name = name), (this.age = age));
}

user2.prototype.greet = function () {
  console.log(`Hello, ${this.name} and ${this.age}`);
};

const Person = new user2("vikash", 27);

Person.greet();
