"use client";
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const cls = `${styles.button} ${styles[variant]} ${className}`.trim();
  return <button className={cls} {...props} />;
}
