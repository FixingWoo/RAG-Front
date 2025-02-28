'use client';

import React from 'react';
import styles from './style.module.scss';

import ChatForm from '@/components/Chat/ChatForm';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.formWrapper}>
          <ChatForm />
          <div className={styles.notice}>
            챗봇은 실수를 할 수 있습니다. 중요한 정보를 확인하세요.
          </div>
        </div>
      </main>
    </>
  );
}
