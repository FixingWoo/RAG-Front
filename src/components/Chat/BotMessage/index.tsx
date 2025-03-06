import React from 'react';
import styles from './style.module.scss';

import MarkdownView from '@/components/Chat/Markdown';
import Button, { ButtonVariant } from '@/components/Button';
import Icon, { IconName } from '@/components/Icon';

import { useChatStore } from '@/stores';
import { useToggleWithDelay } from '@/hooks';
import { copyClipboard } from '@/utils';

interface IProps {
  text: string;
}

const BotMessage: React.FC<IProps> = ({ text }) => {
  const { getLastChatStauts } = useChatStore();
  const [isCopied, toggle] = useToggleWithDelay(false, 2000);

  const handleDragCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const selection = window.getSelection();
    if (!selection) return;

    const selectedText = selection.toString();
    navigator.clipboard.writeText(selectedText);
  };

  const handleClickCopy = (text: string) => {
    copyClipboard(text);
    toggle();
  };

  return (
    <div className={styles.container} onCopy={handleDragCopy}>
      <div className={styles.textWrapper}>
        <MarkdownView text={text} />
      </div>

      {getLastChatStauts() === 'Done' && (
        <div className={styles.buttonWrapper}>
          {isCopied ? (
            <Button
              className={styles.button}
              variant={ButtonVariant.CUSTOM}
              size={'30px'}
            >
              <Icon name={IconName.CHECK} />
            </Button>
          ) : (
            <Button
              onClick={() => {
                handleClickCopy(text);
              }}
              className={styles.button}
              variant={ButtonVariant.CUSTOM}
              size={'30px'}
            >
              <Icon name={IconName.COPY} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default BotMessage;
