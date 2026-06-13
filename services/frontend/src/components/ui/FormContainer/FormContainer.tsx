"use client";
import React from 'react';
import styles from './FormContainer.module.css';

interface Props {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function FormContainer({ children, title, subtitle, onSubmit }: Props) {
  return (
    <div className={styles.wrapper}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <form onSubmit={onSubmit} className={styles.form}>{children}</form>
    </div>
  );
}
