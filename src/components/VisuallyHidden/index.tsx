import React from 'react';
import styles from './style.module.scss';

/**
 * ✅ 화면을 깔끔하게 유지하면서도 보조 기술(스크린 리더) 사용자에게 정보를 제공
 * ✅ 아이콘 버튼, 데이터 테이블, 폼 입력 필드 등에서 접근성을 높이는 역할
 * ✅ 웹 접근성 표준(WCAG)에 맞는 UI 구현을 위해 필수적
 */
const VisuallyHidden: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <span className={styles.visuallyHidden}>{children}</span>;
};

export default VisuallyHidden;
