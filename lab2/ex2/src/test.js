// const listInt = [1,2,3,4,5]; // sử dụng [] cho mảng

// const listSquare = listInt.map(x => x*x);
// console.log(listSquare);

// listInt.filter(x => x % 2 === 0).forEach(x => console.log(x));

// const sum = listInt.reduce((acc, x) => acc + x, 0);
// console.log(sum);

const people = [
    {id: 1,name: 'Thuan', age: 20},
    {id :2, name: 'Dung', age: 30},
    {id:3 ,name: 'Hoai', age: 35},
    {id: 4,name: 'Ben', age: 27},
    {id: 5,name: 'Hung', age: 98}
];

console.log("danh sach tat ca:");
people.forEach(person => {
    console.log(`ID: ${person.id}, Name: ${person.name}, Tuoi: ${person.age}`);
});

console.log("danh sach lon hon 20 tuoi:");
people.filter(person => person.age > 20).forEach(person=>{
    console.log(`ID ${person.id}, Name:${person.name}, Tuoi: ${person.age}`);
});
