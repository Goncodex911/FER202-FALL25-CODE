import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function CounterComponent() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ padding: 20, border: '1px solid #ccc' }}>
      <h2>Bộ Đếm Đa Năng</h2>
      <p style={{ fontSize: 24, fontWeight: 'bold' }}>Giá trị hiện tại: {count}</p>
      <Button variant="primary" onClick={increment}>Tăng (+1)</Button>{' '}
      <Button variant="warning" onClick={decrement}>Giảm (-1)</Button>{' '}
      <Button variant="danger" onClick={reset}>Reset</Button>
    </div>
  );
}
export default CounterComponent;
