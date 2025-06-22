import React from 'react';
import styles from './NoDataMessage.module.css';

interface NoDataMessageProps {
  message: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({ message }) => {
  return (
    <div className={styles.container}>
      <div className={styles.error}>{message}</div>
    </div>
  );
};

export default NoDataMessage; 