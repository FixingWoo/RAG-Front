import React from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import styles from './style.module.scss';

import Button, { ButtonVariant } from '@/components/Button';
import Icon, { IconName } from '@/components/Icon';
import VisuallyHidden from '@/components/VisuallyHidden';
import Placeholder from '@/components/Placeholder';

import { useChatStore, useAbortControllerStore } from '@/stores';
import { chat } from '@/apis';

const ChatForm = React.forwardRef<HTMLTextAreaElement>(({}, ref) => {
  const { abortRequest } = useAbortControllerStore();
  const { question, setQuestion, setChats, clearChats, getLastChat } =
    useChatStore();

  const handleChange = (e: ContentEditableEvent) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    const question = useChatStore.getState().question;
    if (
      !question ||
      (getLastChat() &&
        (getLastChat().status === 'Pending' ||
          getLastChat().status === 'Process'))
    )
      return;

    try {
      setChats({ type: 'User', text: question });
      setQuestion('');

      await chat(question);
    } catch (e) {
      console.log(e);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
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
        <Button variant={ButtonVariant.BTN_36_PRIMARY} onClick={clearChats}>
          초기화
        </Button>

        {getLastChat() &&
        (getLastChat().status === 'Pending' ||
          getLastChat().status === 'Process') ? (
          <Button
            variant={ButtonVariant.BTN_36_SECONDARY}
            width={'36px'}
            height={'36px'}
            onClick={abortRequest}
          >
            <Icon name={IconName.PAUSE} />
          </Button>
        ) : (
          <Button
            variant={ButtonVariant.BTN_36_SECONDARY}
            width={'36px'}
            height={'36px'}
            disabled={!question || question === '<br>'}
            onClick={handleSubmit}
          >
            <Icon name={IconName.ARROW_UP} />
          </Button>
        )}
      </div>
    </div>
  );
});

ChatForm.displayName = 'ChatForm';

export default ChatForm;
