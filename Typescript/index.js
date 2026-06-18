var name2 = "Prakash";
console.log("Hello ".concat(name2));
var user = function (value) {
    console.log(value);
    return value;
};
var result = user({
    name: "prakaash",
    age: "24",
    fetures: ["faire in colour", 6.5, false],
    job: "SDE",
});
console.log(result);
