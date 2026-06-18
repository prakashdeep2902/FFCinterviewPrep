// object orianted Programming

class car {
  whoseCar = "prakash";
  constructor(brand, car) {
    this.car = car;
    this.brand = brand;
  }
}

const car1 = new car("BMW", "4*4 bmw");

// console.log(car1);

class mathcal {
  user = {
    name: ["prakash", "vikash", "akash"],
    class: [8, 9, 10],
  };

  constructor(genricNum) {
    this.genricNum = genricNum;
  }

  multiply(num) {
    const sName = this.user.name[0];
    const sClass = this.user.class[0];

    return `student of class ${sClass} with name ${sName} returning ${this.genricNum * num}`;
  }

  addition(num) {
    return this.genricNum + num;
  }

  sub(num) {
    return this.genricNum - num;
  }
}

const math = new mathcal(100);

// console.log(math);
// const resofMul = math.multiply(2);
// console.log("multiplication::==>", resofMul);

// const resofadd = math.addition(17);
// console.log("addition::==>", resofadd);

// const resofSub = math.sub(26);

// console.log("substraction::==>", resofSub);

// example of Encapsulation
class BankAccount {
  //   #userBalance = {
  //     [name]: ((name) => {
  //       if (name === "vikash") {
  //         return {
  //           balance: 5000,
  //           FDAmount: 2000,
  //           dudction: 100,
  //         };
  //       } else {
  //         return {
  //           balance: 8000,
  //           FDAmount: 1000,
  //           dudction: 500,
  //         };
  //       }
  //     })(),
  //   };

  #balance = 5000;
  #FDAmount = 2000;
  #dudction = 100;
  #totalAMount = this.#balance + this.#FDAmount + this.#dudction;
  #users = [
    {
      name: "prakash",
      useName: "prakash123",
      details: {
        bankId: "&^*^&",
        totalAmount: this.#balance + this.#FDAmount - this.#dudction,
      },
    },
    {
      name: "vikash",
      useName: "vikash123",
      details: {
        bankId: "&^**)&",
        totalAmount: this.#balance + this.#FDAmount - this.#dudction,
      },
    },
  ];

  deposit(cred, amount) {
    const { name, useName } = cred;
    const Info = this.#users.find((i) => i.name == name);
    this.#totalAMount = this.#totalAMount + amount;
  }

  getBalance() {
    return this.#totalAMount;
  }
}

const acc = new BankAccount();
acc.deposit({ name: "vikash", useName: "vikash123" }, 200);

// console.log(acc.getBalance());

// Example of  Inheritance an polymormis

class Animal {
  constructor(name, feature) {
    this.name = name;
    this.feature = feature;
  }
}

class Dog extends Animal {
  constructor(name, breed, feature) {
    super(name, feature);
    this.breed = breed;
  }

  getDetails() {
    return {
      discription: `A ${this.feature.name} is ${this.feature.disc} `,
    };
  }
}

class Cow extends Animal {
  constructor(name, breed, feature) {
    super(name, feature);
    this.breed = breed;
  }

  getDetails() {
    return {
      name: this.name,
      breed: this.breed,
      discription: `A ${this.feature.name} is ${this.feature.disc} `,
    };
  }
}

const dog = new Dog("Tommy", "Labrador", {
  name: "Dog",
  eyes: 2,
  legs: 4,
  disc: "human friendly animal",
});

const cow = new Cow("bunti", "Desi", {
  name: "cow",
  eyes: 2,
  legs: 4,
  disc: "human friendly animal",
});

// console.log(dog.getDetails());
// console.log(cow.getDetails());

// this exampel of getter seeter

class preparing {
  constructor(whatPrep) {
    this.food = whatPrep;
  }

  set whatPrep(value) {
    this.food = value;
  }

  get fullmeal() {
    return `${this.#scrate()}`;
  }
  static ingred(value) {
    return (this.value = value);
  }

  //   Abstraction
  #scrate() {
    const milk = "glass";
    return `${JSON.stringify(this.constructor.value)} + ${milk}`;
  }
}

preparing.ingred({ suger: "2 spon", TeaLeaf: "1 spone" });
const tea = new preparing();

tea.whatPrep = "tea";

console.log(tea.fullmeal);

// Create Inheritance Using Prototype
