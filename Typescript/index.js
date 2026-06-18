var name2 = "Prakash";
var user = function (value) {
    return value;
};
var result = user({
    name: "prakaash",
    age: "24",
    fetures: ["faire in colour", 6.5, false],
    job: "SDE",
});
// console.log(result);
function getValue(value) {
    return value;
}
console.log(getValue("getValue"));
console.log(getValue(12));
console.log(getValue([12, 17, 10]));
var response = {
    success: true,
    data: {
        id: 1,
        name: "Prakash",
    },
};
function printUser(user) {
    console.log(user);
}
printUser({ id: 123, name: "prakaash", age: 25 });
function show(person, key) {
    return person[key];
}
var userbig = {
    id: 1,
    name: "Prakash",
    Mnumber: 8051288351,
};
console.log(show(userbig, "name"));
function showAnimal(animal) {
    console.log("animal:::==>", animal);
}
var animal = {
    name: "Lion",
    type: "carnivorus",
    numberOfPopulation: 1234,
};
showAnimal({ numberOfPopulation: 1234, type: "carnivorus" });
function display(value) {
    return value;
}
display("Hello");
display(100);
console.log("==>", display("Hello"));
console.log("display(100);", display(100));
