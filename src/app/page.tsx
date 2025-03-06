'use client';

import React, { useEffect, useRef } from 'react';
import styles from './style.module.scss';

import ChatHeader from '@/components/Chat/ChatHeader';
import ChatContent from '@/components/Chat/ChatContent';
import ChatForm from '@/components/Chat/ChatForm';

import { useChatStore } from '@/stores';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getChatsLength, chats } = useChatStore();
  const chatsLength = getChatsLength();

  useEffect(() => {
    document.body.scrollTop = document.body.scrollHeight;
  }, [chats]);

  return (
    <>
      <ChatHeader />

      <div className={styles.container} ref={containerRef}>
        <div className={styles.main}>
          <ChatContent />
          <div
            className={`${styles.formWrapper} ${
              chatsLength ? styles.updatedState : ''
            } `}
          >
            {!chatsLength && <h2>무엇을 도와드릴까요?</h2>}
            <ChatForm />
            <div className={styles.notice}>
              챗봇은 실수를 할 수 있습니다. 중요한 정보를 확인하세요.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
