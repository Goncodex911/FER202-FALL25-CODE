import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

const accounts = [
  { id: 1, username: 'john_doe', password: '1234', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: 2, username: 'alice', password: 'abcd', avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: 3, username: 'michael', password: 'pass', avatar: 'https://i.pravatar.cc/100?img=3' },
];

function SearchAccount() {
  const [search, setSearch] = useState('');
  const filtered = accounts.filter(acc =>
    acc.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h3 className="text-center">Tìm kiếm Account</h3>
      <input
        type="text"
        value={search}
        placeholder="Nhập username..."
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 20 }}
      />
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {filtered.length > 0 ? (
          filtered.map(acc => (
            <Card key={acc.id} style={{ width: 180, textAlign: 'center' }}>
              <Card.Img variant="top" src={acc.avatar} />
              <Card.Body>
                <Card.Title>{acc.username}</Card.Title>
                <Card.Text>{acc.password}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>Không tìm thấy kết quả</p>
        )}
      </div>
    </div>
  );
}
export default SearchAccount;
