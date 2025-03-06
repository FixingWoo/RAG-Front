'use client';

import React from 'react';
import styles from './style.module.scss';

const ChatHeader: React.FC = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>BlueRAG</h1>
    </header>
  );
};

export default ChatHeader;
