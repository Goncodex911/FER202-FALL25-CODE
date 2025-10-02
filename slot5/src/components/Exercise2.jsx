// src/components/Exercise2.jsx
export default function Exercise2() {
  // Dữ liệu mẫu (có thể tách ra file riêng nếu cần)
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
  ];

  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  // people cho Bài 5
  const people = [
    { name: "Ann", age: 19 },
    { name: "Bob", age: 12 },
    { name: "Chris", age: 17 },
    { name: "Daisy", age: 20 },
    { name: "Emma", age: 13 },
  ];

 
  // 5. Map + filter – danh sách teen (13–19)

  const teenLines = people
    .filter((p) => p.age >= 13 && p.age <= 19)
    .map((p) => `${p.name} (${p.age})`);

 
  // 6. Sort + slice – doanh nghiệp theo năm kết thúc

 
  const top3EndAsc = [...companies]
    .sort((a, b) => a.end - b.end)
    .slice(0, 3)
    .map((c) => `${c.name} - ${c.end}`);

  // 7. Spread vs. rest – bất biến & gộp mảng
  const company0New = { ...companies[0], start: companies[0].start + 1 };

  // Hàm gộp mảng bằng rest params
  function concatAll(...arrays) {
    // có thể dùng reduce hoặc flat
    return arrays.reduce((acc, curr) => [...acc, ...curr], []);
  }
  const concatResult = concatAll([1, 2], [3], [4, 5]);


  // 8. Reduce nâng cao – thống kê tuổi
 
  const stats = ages.reduce(
    (acc, age) => {
      acc.total += age;
      if (age < acc.min) acc.min = age;
      if (age > acc.max) acc.max = age; 
      if (age >= 13 && age <= 19) acc.buckets.teen += 1;
      if (age >= 20) acc.buckets.adult += 1;
      return acc;
    },
    {
      total: 0,
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY,
      buckets: { teen: 0, adult: 0 },
    }
  );

  return (
    <div>
      <h2>Exercise2</h2>
      <h2> In max </h2>
      <p>Max: {stats.max}</p>

      {/* Bài 5 */}
      <section>
        <h3>5. Teen list </h3>
        <ul>
          {teenLines.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </section>

      {/* Bài 6 */}
      <section>
        <h3>6. Top 3 theo năm kết thúc</h3>
        <ol>
          {top3EndAsc.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ol>
      </section>

      {/* Bài 7 */}
      <section>
        <h3>7. Spread vs Rest</h3>
        <p>
          companies[0]:{" "}
          {JSON.stringify(companies[0])}
          
        </p>
        <p>
          company0New:{" "}
          {JSON.stringify(company0New)}
        </p>
        <p>concatAll([1,2], [3], [4,5]) =&gt; {JSON.stringify(concatResult)}</p>
      </section>

      {/* Bài 8 */}
      <section>
        <h3>8.  thống kê tuổi</h3>
        <p>
          Total: {stats.total}, Min: {stats.min}, Max: {stats.max}
        </p>
        <p>
          Buckets: {`{ teen: ${stats.buckets.teen}, adult: ${stats.buckets.adult} }`}
        </p>
      </section>
    </div>
  );
}
