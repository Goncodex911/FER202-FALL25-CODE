const [first, , third = 0, ...restAges] = [33, 12, 20, 16];
console.log("first:", first, "| third:", third, "| restAges:", restAges);