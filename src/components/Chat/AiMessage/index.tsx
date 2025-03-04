import React from 'react';
import styles from './style.module.scss';

import MarkdownView from '@/components/Chat/Markdown';

interface IProps {
  text: string;
}

const AiMessage: React.FC<IProps> = ({ text }) => {
  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const selection = window.getSelection();
    if (!selection) return;

    const selectedText = selection.toString(); // HTML 태그 없이 텍스트만 복사
    navigator.clipboard.writeText(selectedText);
  };

  return (
    <div className={styles.container} onCopy={handleCopy}>
      <div className={styles.wrapper}>
        <MarkdownView text={text} />
      </div>
    </div>
  );
};

export default AiMessage;
