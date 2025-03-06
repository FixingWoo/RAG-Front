'use client';

import React from 'react';
import styles from './style.module.scss';

import UserMessage from '@/components/Chat/UserMessage';
import BotMessage from '@/components/Chat/BotMessage';
import ErrorMessage from '@/components/Chat/ErrorMessage';
import Loading from '@/components/Loading';

import { useChatStore } from '@/stores';

const ChatContent: React.FC = () => {
  const { chats } = useChatStore();

  return (
    <div className={styles.container}>
      {chats.map((chat, index) =>
        chat.type === 'User' ? (
          <UserMessage key={index} text={chat.text} />
        ) : (
          <React.Fragment key={index}>
            {chat.status === 'Pending' && <Loading />}

            {(chat.status === 'Process' || chat.status === 'Done') && (
              <BotMessage text={chat.text} index={index} />
            )}

            {(chat.status === 'Error' || chat.status === 'Pause') && (
              <ErrorMessage text={chat.text} />
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default ChatContent;
