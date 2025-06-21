import React from 'react';
import styles from './ChatStream.module.css';

// Chat Functionality Imports
import type { Message } from '../../types';
import MessageComponent from '../Message/MessageComponent';


const ChatStream: React.FC<{ chats: Message[] }> = ({ chats }) => {

  


  return (
    <div className={styles.chatStream}>
      {/* Future: This will render Message components */}
      {
        chats.map(message => (
          <MessageComponent key={message.id} message={message} />
        ))
      }
    </div>
  );
};

export default ChatStream; 