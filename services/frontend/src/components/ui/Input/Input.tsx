"use client";
import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

export default function Input({ label, error, id, ...props }: InputProps) {
  const inputId = id || props.name || Math.random().toString(36).slice(2, 9);
  return (
    <div className={styles.field}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <input id={inputId} className={`${styles.input} ${error ? styles.error : ''}`} {...props} />
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}
