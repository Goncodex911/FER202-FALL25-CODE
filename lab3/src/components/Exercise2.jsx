export function exercise2() {
    //tạo mảng số nguyên , in ra danh sách theo thẻ <li>
    const numbers = [1,2,3,4,5];
    //tính tổng các phần tử trong mảng
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    //tính giá trị trung bình
    const average = sum / numbers.length;
    // khai báo mảng chuỗi names , in ra danh sách các tên theo thứ tự tăng dần bảng alphabet
    const names = ["thuan","hoai","quan","binh","dang"];
    names.sort();
    // khai báo 1 mảng people chứa 10 đối tượng students
    // mỗi đối tượng có các thuộc tính id , name ,age , grade
    // id số nguyên , name chuỗi , age số nguyên , grade số thực
    const students = [
        {id:1, name:"thuan", age:20, grade:8.5},
        {id:2, name:"hoai", age:21, grade:7.5},
        {id:3, name:"quan", age:22, grade:6.5},

        {id:4, name:"binh", age:23, grade:5.5},
        {id:5, name:"dang", age:24, grade:4.5},
        {id:6, name:"an", age:25, grade:9.5},
        {id:7, name:"bao", age:26, grade:8.0},
        {id:8, name:"cuong", age:27, grade:7.0},
        {id:9, name:"dung", age:28, grade:6.0},
        {id:10, name:"em", age:29, grade:5.0},
    ];


    return(
    <div>
        <h2> Exercise2</h2>
        <p> this is the second exercise component</p>
        <p> in mang so nguyen</p>
        <ul>
            {
                numbers.map((number,index) => (
                    <li key = {index}>{index} - {number}</li>
                ))

            }
        </ul>

        <p> tong cac phan tu " {sum} </p>

             
        <p> gia tri trung binh {average}/</p>
        <p> in mang chuoi theo thu tu tang dan bang alphabet</p>
        <ul>
            {
                names.map((name,index) => (
                    <li key = {index}>{index} - {name}</li>
                ))
            }
        </ul>

        <p> In ra danh sách students có grade lớn hơn hoặc bằng 7.5 , sắp xếp giảm dần </p>
        <ul>
            {
                students
                .filter(student => student.grade >= 7.5)
                .sort((a,b) => b.grade - a.grade)
                .map((student,index) => (       
                    <li key = {index}>{index} - {student.name} - {student.grade}</li>
                ))
            }
        </ul>
        
        <p> In ra danh sách dưới dạng bảng (table) gồm các cột id, name, age, grade</p>
        <table border={1} cellPadding={5} cellSpacing={0}> 
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {
                    students.map((student,index) => (
                        <tr key={index}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.grade}</td>

                        </tr>
                    ))
                }
            </tbody>
        </table>

          <tfoot>
                    <tr>
                        <td avg colSpan={4}>Average Grade: { (students.reduce((acc, student) => acc + student.grade, 0) / students.length).toFixed(2)}</td>
                    </tr>
                </tfoot>      
            
            
    </div>
    );
}