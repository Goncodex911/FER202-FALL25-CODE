
const companies = [
  { name: "Company One",   category: "Finance",    start: 1981, end: 2004 },
  { name: "Company Two",   category: "Retail",     start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto",       start: 1999, end: 2007 },
  { name: "Company Four",  category: "Retail",     start: 1989, end: 2010 },
  { name: "Company Five",  category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six",   category: "Finance",    start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto",       start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine",  category: "Retail",     start: 1981, end: 1989 }
];

const ages = [33,12,20,16,5,54,21,44,61,13,15,45,25,64,32];

const person = {
  name: "Costas",
  address: { street: "Lalaland 12" }
};
const double = n => n * 2;
const isEven = n => n % 2 === 0;

console.log("double(7) =", double(7));
console.log("isEven(10) =", isEven(10));
console.log("isEven(7)  =", isEven(7));
const sum = (...nums) =>
  nums
    .map(x => Number(x))
    .filter(x => Number.isFinite(x))
    .reduce((acc, x) => acc + x, 0);

const avg = (...nums) => {
  const valid = nums.map(Number).filter(Number.isFinite);
  if (valid.length === 0) return 0;
  return Number((valid.reduce((a,b)=>a+b,0) / valid.length).toFixed(2));
};

console.log("sum(1,2,3)            =", sum(1,2,3));
console.log("sum(1,'x',4)          =", sum(1,'x',4));
console.log("avg(1,2,3,4)          =", avg(1,2,3,4));
console.log("avg()                  =", avg());

const {
  address: { street, city = "Unknown City" }
} = person;

console.log("street:", street);
console.log("city:", city);

const [first, , third = 0, ...restAges] = [33, 12, 20, 16];
console.log("first:", first, "| third:", third, "| restAges:", restAges);
const people = [
  { name: "Ann", age: 19 }, { name: "Ben", age: 12 },
  { name: "Chau", age: 13 },{ name: "Duy", age: 20 },
  { name: "Eva", age: 17 }
];
people
  .filter(p => p.age >= 13 && p.age <= 19)
  .map(p => `${p.name} (${p.age})`)
  .forEach(line => console.log(line));
const byEndAsc = [...companies].sort((a,b) => a.end - b.end);
byEndAsc.slice(0,3).forEach(c => console.log(`${c.name} - ${c.end}`));
const company0New = { ...companies[0], start: companies[0].start + 1 };
console.log("companies[0]:", companies[0]);
console.log("company0New :", company0New);

const concatAll = (...arrays) => arrays.reduce((acc, arr) => acc.concat(arr), []);
console.log("concatAll:", concatAll([1,2], [3], [4,5]));

const stats = ages.reduce(
  (acc, age) => {
    acc.total += age;
    acc.min = Math.min(acc.min, age);
    acc.max = Math.max(acc.max, age);
    if (age >= 13 && age <= 19) acc.buckets.teen++;
    else if (age >= 20) acc.buckets.adult++;
    return acc;
  },
  { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } }
);

console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
console.log("Buckets:", stats.buckets);
