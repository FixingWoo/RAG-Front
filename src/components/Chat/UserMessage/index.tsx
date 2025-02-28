import React from 'react';
import styles from './style.module.scss';

interface IProps {
  text: string;
}

const UserMessage: React.FC<IProps> = ({ text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default UserMessage;
