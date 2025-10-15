import React, { useState } from 'react';

const data = [
  { id: 1, name: 'Apple', category: 'Fruit' },
  { id: 2, name: 'Carrot', category: 'Vegetable' },
  { id: 3, name: 'Banana', category: 'Fruit' },
  { id: 4, name: 'Broccoli', category: 'Vegetable' },
];

function SearchItem() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredList = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20 }}>
      <h3>Tìm kiếm theo tên</h3>
      <input
        type="text"
        value={searchTerm}
        placeholder="Nhập tên..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <ul>
        {filteredList.map(item => (
          <li key={item.id}>{item.name} ({item.category})</li>
        ))}
        {filteredList.length === 0 && <li>Không tìm thấy kết quả</li>}
      </ul>
    </div>
  );
}
export default SearchItem;
