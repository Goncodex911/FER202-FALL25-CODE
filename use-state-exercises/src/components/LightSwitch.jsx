import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function LightSwitch() {
  const [isLightOn, setIsLightOn] = useState(false);
  const toggleLight = () => setIsLightOn(!isLightOn);

  return (
    <div style={{ padding: 20, border: '1px solid #ccc' }}>
      <h2>Công Tắc Đèn</h2>
      <p style={{ fontSize: 24, fontWeight: 'bold' }}>
        Đèn hiện đang: {isLightOn ? 'Bật' : 'Tắt'}
      </p>
      <Button
        onClick={toggleLight}
        style={{ background: isLightOn ? 'red' : 'green', color: 'white' }}
      >
        {isLightOn ? 'Tắt Đèn' : 'Bật Đèn'}
      </Button>
    </div>
  );
}
export default LightSwitch;
