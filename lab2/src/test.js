// let greet =(name,timeOfDay) => {
//     console.log(`Good ${timeOfDay}, ${name}!`);
// };
// greet("Alice", "morning");
// greet("Bob", "evening");

// let square = num => {
//     return num * num;
// }
// console.log(square(5)); // Output: 25
// console.log(square(10)); // Output: 100

// let sayHello = () => {
//     console.log("hello hello");

// };
// sayHello();

let person = {
    name:"hieu thuan",
    age: 20,
    greet: function() {
        console.log(`hello , my name is ${this.name} and i'm ${this.age} year old` );
    }
};


