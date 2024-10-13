import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const LoaderSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoaderSpinner;
