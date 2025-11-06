import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain2.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
  <Tilt
    className='br2 shadow-2'
    tiltMaxAngleX={8}
    tiltMaxAngleY={8}
    perspective={2500}
    style={{ height: '150px', width: '150px' }}
  >
    <div className='flex items-center justify-center pa3'>
      <img alt="brain" src={brain} style={{ width: '100%' }} />
    </div>
  </Tilt>
</div>

  );
};

export default Logo;
