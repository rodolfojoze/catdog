"use client";
import React from 'react';
import styles from './Alert.module.css';

interface Props {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose?: () => void;
}

export default function Alert({ type, message, onClose }: Props) {
  return (
    <div className={`${styles.alert} ${styles[type]}`} role="status">
      <div className={styles.content}>{message}</div>
      {onClose && <button className={styles.close} onClick={onClose}>✕</button>}
    </div>
  );
}
