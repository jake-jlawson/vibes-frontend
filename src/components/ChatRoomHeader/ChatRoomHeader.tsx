import React from 'react';
import styles from './ChatRoomHeader.module.css';

const ChatRoomHeader: React.FC = () => {
    return (
      <div className={styles.chatRoomHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <div className={styles.appName}>
              CAREER BOT AI
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ChatRoomHeader;