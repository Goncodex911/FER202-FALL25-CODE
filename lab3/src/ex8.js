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