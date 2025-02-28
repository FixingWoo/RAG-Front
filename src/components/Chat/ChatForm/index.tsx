import React from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import styles from './style.module.scss';

import Button, { ButtonVariant } from '@/components/Button';
import Icon, { IconName } from '@/components/Icon';
import VisuallyHidden from '@/components/VisuallyHidden';
import Placeholder from '@/components/Placeholder';

import { useChatStore } from '@/stores';

const Textarea = React.forwardRef<HTMLTextAreaElement>(({}, ref) => {
  const { question, setQuestion } = useChatStore();

  const handleChange = (e: ContentEditableEvent) => {
    setQuestion(e.target.value);
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
        tagName={'div'}
      />

      {!question && <Placeholder text={'무엇이든 물어보세요.'} />}

      <div className={styles.wrapper}>
        <Button
          className={styles.submitButton}
          variant={ButtonVariant.CUSTOM}
          width={'36px'}
          height={'36px'}
          disabled={!question || question === '<br>'}
          onClick={() => console.log(question)}
        >
          <Icon
            name={IconName.ARROW_UP}
            strokeColor={'white'}
            fillColor={'white'}
          />
        </Button>
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
