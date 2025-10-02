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