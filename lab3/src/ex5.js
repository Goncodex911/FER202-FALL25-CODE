const people = [
  { name: "Ann", age: 19 }, { name: "Ben", age: 12 },
  { name: "Chau", age: 13 },{ name: "Duy", age: 20 },
  { name: "Eva", age: 17 }
];
people
  .filter(p => p.age >= 13 && p.age <= 19)
  .map(p => `${p.name} (${p.age})`)
  .forEach(line => console.log(line));
  