// src/components/Exercise1.jsx
export default function Exercise1() {
  // tính hàm double
  const double = (x) => x * 2;
  // kiểm tra số chẵn
  const isEven = (x) => x % 2 === 0;

  return (
    <div>
      <h2> Exercise1</h2>
      <p> this is the first exercise component</p>
      <p> ket qua ham double(5) : {double(5)}</p>
      <p>
        ket qua ham isEven :
        {isEven(4) ? " so chan" : " so le"}
      </p>
    </div>
  );
}
