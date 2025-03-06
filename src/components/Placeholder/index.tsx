import React from 'react';
import styles from './style.module.scss';

import { useChatStore } from '@/stores';

interface IProps {
  text: string;
}

const Placeholder: React.FC<IProps> = ({ text }) => {
  const { getChatsLength } = useChatStore();
  const chatsLength = getChatsLength();

  return (
    <p
      className={`${styles.placeholder} ${
        chatsLength ? styles.updatedState : ''
      } `}
      data-placeholder={text}
    ></p>
  );
};

export default Placeholder;
