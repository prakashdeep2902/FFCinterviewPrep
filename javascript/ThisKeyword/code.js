// this key word

const greet = {
  name: "prakash",
  showName: () => {
    console.log(this.name);
  },
};

greet.showName();

let name = "vikash";

const geet2 = {
  hobbie: "coding",
  outer() {
    let name = "prakash";
    const inner = () => {
      console.log(this.hobbie, this.name);
    };

    inner();
  },
};

geet2.outer();

//  call (),apply(),bind()

function showDetails(a, b, c, t) {
  console.log(this.name, this.job);
  console.log(a, b, c);
}

showDetails.apply({ name: "vikash", job: "SDE" }, [1, 2, 4, 4, 5]);

// bind()

const person = {
  name: "Prakash",
  sayHello: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

// If we call it directly from the object, it works:
person.sayHello(); // Output: "Hello, my name is Prakash"

// ❌ THE PROBLEM: What if we copy the function to a variable?
const greetLater = person.sayHello.bind(person);

greetLater();
