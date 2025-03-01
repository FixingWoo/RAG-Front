import React from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import styles from './style.module.scss';

import Button, { ButtonVariant } from '@/components/Button';
import Icon, { IconName } from '@/components/Icon';
import VisuallyHidden from '@/components/VisuallyHidden';
import Placeholder from '@/components/Placeholder';

import { useChatStore } from '@/stores';

const ChatForm = React.forwardRef<HTMLTextAreaElement>(({}, ref) => {
  const { question, setQuestion, setChats } = useChatStore();

  const handleChange = (e: ContentEditableEvent) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = () => {
    if (!question) return;

    setChats({ type: 'User', text: question });
    setQuestion('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      const question = useChatStore.getState().question;

      e.preventDefault();
      if (!question) return;

      setChats({ type: 'User', text: question });
      setQuestion('');
    }
  };

  return (
    <div className={styles.container}>
      <VisuallyHidden>
        <textarea ref={ref} readOnly />
      </VisuallyHidden>

      <ContentEditable
        className={styles.promptTextarea}
        html={question}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        tagName={'div'}
      />

      {!question && <Placeholder text={'무엇이든 물어보세요.'} />}

      <div className={styles.wrapper}>
        <Button variant={ButtonVariant.BTN_36_PRIMARY}>초기화</Button>

        <Button
          variant={ButtonVariant.BTN_36_SECONDARY}
          width={'36px'}
          height={'36px'}
          disabled={!question || question === '<br>'}
          onClick={handleSubmit}
        >
          <Icon name={IconName.ARROW_UP} />
        </Button>
      </div>
    </div>
  );
});

ChatForm.displayName = 'ChatForm';

export default ChatForm;
