import React, { CSSProperties, HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

import ArrowUp from '@/assets/icons/ico-arrow-up.svg';
import Copy from '@/assets/icons/ico-copy.svg';
import Check from '@/assets/icons/ico-check.svg';

export enum IconName {
  ARROW_UP = 'arrow-up',
  COPY = 'copy',
  CHECK = 'check',
}

const ICONS: { [key in IconName]: React.ReactNode } = {
  [IconName.ARROW_UP]: <ArrowUp />,
  [IconName.COPY]: <Copy />,
  [IconName.CHECK]: <Check />,
};

interface IIconProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  width?: number;
  height?: number;
  size?: number;
  strokeColor?: string;
  fillColor?: string;
  className?: string;
  style?: CSSProperties;
}

const Icon: React.FC<IIconProps> = ({
  name,
  width,
  height,
  size,
  className,
  strokeColor,
  fillColor,
  style,
  ...props
}) => {
  return (
    <span
      className={cn(
        styles.icon,
        {
          [styles.strokeColor]: strokeColor,
          [styles.fillColor]: fillColor,
        },
        className
      )}
      style={
        {
          '--icon-width': `${width || size}px`,
          '--icon-height': `${height || size}px`,
          '--icon-stroke-color': strokeColor,
          '--icon-fill-color': fillColor,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {ICONS[name]}
    </span>
  );
};

export default Icon;
