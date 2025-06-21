import React from 'react';
import styles from './ChatWindow.module.css';
import bgImage from '../assets/3dbg.png';

//Components
import ChatRoomHeader from '../components/ChatRoomHeader/ChatRoomHeader';
import ExpansiblePanel from '../components/ExpansiblePanel/ExpansiblePanel';
import Character from '../components/Character/Character';
import ChatStream from '../features/chat/components/ChatStream/ChatStream';
import { ChatBox } from '../features/chat/components/ChatBox/ChatBox';

// Hooks
import  useChat from '../features/chat/useChat';


const ChatWindow: React.FC = () => {
  
  const { chatStream, addMessage } = useChat();
  
  
  
  
  return (
    <div className={styles.chatWindow}>
      <ChatRoomHeader />
      
      <div className={styles.chatRoomContent}>

          {/* Control Area - Left Side */}
          <div className={styles.controlArea}>

            <div className={styles.controlPanel1}>
              <ExpansiblePanel title="Career Profile">
                <div className={styles.controlPanel1Content}></div>
              </ExpansiblePanel>
            </div>

            <div className={styles.controlPanel2}>
            <ExpansiblePanel title="Top Ranked Careers">
                <div className={styles.controlPanel1Content}></div>
              </ExpansiblePanel>
            </div>
          </div>

          {/* Character Area - Center */}
          <div className={styles.characterArea}>
            <Character />
          </div>

          {/* Chat Area - Right Side */}
          <div className={styles.chatArea}>
            <div className={styles.chatStream}>
              <ChatStream chats={chatStream} />
            </div>
    
            {/* Chat Input Container */}
            <div className={styles.chatBoxContainer}>
              <ChatBox onSendMessage={(message) => addMessage(message, 'user')} />
            </div>
          </div>
      </div>
      
      {/* Background */}
      <div className={styles.bgOverlay}></div>
      <img src={bgImage} alt="background" className={styles.bgImage} />
    </div>
  );
};

export default ChatWindow; 