import React from 'react';
import styles from './style.module.scss';
const Loading: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
    </div>
  );
};

export default Loading;
