import React from 'react';
import { Puff } from 'react-loader-spinner';

export default function SpinnerLoading() {
  return (
    <div style={styles.container}>
    <Puff
      color="#e6858a"
      height={100}
      width={100}
      timeout={3000}
    />
  </div>
  );
}

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Full viewport height
    }
  };