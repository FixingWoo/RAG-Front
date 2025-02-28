import React from 'react';
import styles from './style.module.scss';

interface IProps {
  text: string;
}

const Placeholder: React.FC<IProps> = ({ text }) => {
  return <p className={styles.placeholder} data-placeholder={text}></p>;
};

export default Placeholder;
