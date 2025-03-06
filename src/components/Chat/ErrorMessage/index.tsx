import React, { useEffect, useState, useRef } from 'react';
import styles from './style.module.scss';

import Icon, { IconName } from '@/components/Icon';

interface IProps {
  text: string;
}

const ErrorMessage: React.FC<IProps> = ({ text }) => {
  const [isMultiLine, setIsMultiLine] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsMultiLine(
        textRef.current.scrollHeight > textRef.current.clientHeight
      );
    }
  }, [text]);

  return (
    <div
      className={`${styles.container} ${isMultiLine ? styles.multiLine : ''}`}
    >
      <Icon
        name={IconName.CAUTION}
        strokeWidth={'0.1'}
        strokeColor={'#F83A37'}
        fillColor={'#F83A37'}
      />
      <p ref={textRef}>{text}</p>
    </div>
  );
};

export default ErrorMessage;
