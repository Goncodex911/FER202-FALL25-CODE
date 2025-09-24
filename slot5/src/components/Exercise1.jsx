// src/components/Exercise1.jsx
export default function Exercise1() {
    const person = {
        name :"Costas",
        address:{
            street:"Lalaland 12",
        }
    };

    // destructuring lồng nhau + giá trị mặc định

    const {
        address:{
            street, city = "Unknown City" // giá trị mặc định
        }
    } = person;

    const age = [33,12,20,16];

    const [first,,third = 0, ...restAges] = ages;
    



  return (
    <div>
      <h2> Exercise1</h2>
      <p> Bài 3 </p>
      <p> Thành phố đó là {city} </p>
      <p> địa chỉ đường: {street}</p>
      <p>Bài 4</p>
      <p>First: {first}</p>
      <p>Third: {third}</p>
      <p>RestAges: {restAges}</p>

    </div>
  );
}