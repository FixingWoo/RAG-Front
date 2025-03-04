'use client';

import React from 'react';
import styles from './style.module.scss';

import UserMessage from '@/components/Chat/UserMessage';
import AiMessage from '@/components/Chat/AiMessage';

import { useChatStore } from '@/stores';

const ChatContent: React.FC = () => {
  const { chats } = useChatStore();

  return (
    <div className={styles.container}>
      {chats.map((chat, index) =>
        chat.type === 'User' ? (
          <UserMessage key={index} text={chat.text} />
        ) : (
          <AiMessage key={index} text={chat.text} />
        )
      )}
    </div>
  );
};

export default ChatContent;
