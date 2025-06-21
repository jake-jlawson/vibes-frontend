import React from 'react';
import styles from './MessageComponent.module.css';
import type { Message as MessageType } from '../../types';

interface MessageProps {
  message: MessageType;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const orientation = isUser ? 'right' : 'left';

  return (
    <div className={`${styles.messageContainer} ${styles[orientation]}`}>

      <div className={`${styles.chatBubble} ${styles[orientation]}`}>
        <div className={`${styles.messageText} ${styles[orientation]}`}>
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;

