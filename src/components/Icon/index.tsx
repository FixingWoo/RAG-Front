import React, { CSSProperties, HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

import ArrowUp from '@/assets/icons/ico-arrow-up.svg';

export enum IconName {
  ARROW_UP = 'arrow-up',
}

const ICONS: { [key in IconName]: React.ReactNode } = {
  [IconName.ARROW_UP]: <ArrowUp />,
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
