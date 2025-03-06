import React, { CSSProperties, HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

import ArrowUp from '@/assets/icons/ico-arrow-up.svg';
import Caution from '@/assets/icons/ico-caution.svg';
import Check from '@/assets/icons/ico-check.svg';
import Copy from '@/assets/icons/ico-copy.svg';
import Pause from '@/assets/icons/ico-pause.svg';

export enum IconName {
  ARROW_UP = 'arrow-up',
  CAUTION = 'caution',
  CHECK = 'check',
  COPY = 'copy',
  PAUSE = 'pause',
}

const ICONS: { [key in IconName]: React.ReactNode } = {
  [IconName.ARROW_UP]: <ArrowUp />,
  [IconName.CAUTION]: <Caution />,
  [IconName.COPY]: <Copy />,
  [IconName.CHECK]: <Check />,
  [IconName.PAUSE]: <Pause />,
};

interface IIconProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  width?: number;
  height?: number;
  size?: number;
  strokeWidth?: string;
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
  strokeWidth,
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
          [styles.strokeWidth]: strokeWidth,
          [styles.strokeColor]: strokeColor,
          [styles.fillColor]: fillColor,
        },
        className
      )}
      style={
        {
          '--icon-width': `${width || size}px`,
          '--icon-height': `${height || size}px`,
          '--icon-stroke-width': strokeWidth,
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
