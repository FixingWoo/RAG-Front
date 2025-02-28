'use client';

import React from 'react';
import styles from './style.module.scss';

import VisuallyHidden from '@/components/VisuallyHidden';

export default function Home() {
  return (
    <>
      <button>테스트</button>
      <VisuallyHidden>테스트</VisuallyHidden>
    </>
  );
}
