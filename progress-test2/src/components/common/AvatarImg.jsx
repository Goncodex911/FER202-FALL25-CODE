import React from 'react';
const AvatarImg = ({ src, size = 36, rounded = true, alt = 'avatar', className = '' }) => {
  const fallback = `${process.env.PUBLIC_URL}/images/users/default.png`;
  const resolved = src ? `${process.env.PUBLIC_URL}${src}` : fallback;

  const style = {
    width: size,
    height: size,
    objectFit: 'cover',
    borderRadius: rounded ? '50%' : 8,
    border: '1px solid rgba(0,0,0,0.1)',
  };

  const handleError = (e) => {
    if (e.target.src !== fallback) {
      e.target.src = fallback;
    }
  };

  return <img src={resolved} alt={alt} style={style} onError={handleError} className={className} />;
};

export default AvatarImg;
