'use client';

import React, { useEffect, useRef } from 'react';
import styles from './style.module.scss';

import ChatContent from '@/components/Chat/ChatContent';
import ChatForm from '@/components/Chat/ChatForm';

import { useChatStore } from '@/stores';
import { test } from '@/apis';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { chats } = useChatStore();

  useEffect(() => {
    async function fetch() {
      const result = await test();

      console.log(result);
    }

    fetch();
  }, []);

  useEffect(() => {
    document.body.scrollTop = document.body.scrollHeight;
  }, [chats]);

  return (
    <>
      <main className={styles.main} ref={containerRef}>
        <ChatContent />
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
