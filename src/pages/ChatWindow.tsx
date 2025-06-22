import React, { useState, useEffect } from 'react';
import styles from './ChatWindow.module.css';
import bgImage from '../assets/3dbg.png';

//Components
import ChatRoomHeader from '../components/ChatRoomHeader/ChatRoomHeader';
import ExpansiblePanel from '../components/ExpansiblePanel/ExpansiblePanel';
import Character from '../components/Character/Character';
import ChatStream from '../features/chat/components/ChatStream/ChatStream';
import { ChatBox } from '../features/chat/components/ChatBox/ChatBox';
import CareerRank from '../features/career_profile/components/CareerRank/CareerRank';
import CareerProfile from '../features/career_profile/components/CareerProfile/CareerProfile';

// Hooks
import useChat from '../features/chat/useChat';
import useCareerProfile from '../features/career_profile/useCareers';

// Data
import character_info from '../assets/character_info.json';







const ChatWindow: React.FC = () => {
  const { chatStream, addMessage, clearChatStream, privateSend } = useChat();
  const { careerProfile, careerRecommendations, updateCareers } = useCareerProfile();
  const [activeCharacter, setActiveCharacter] = useState<string>('neil_armstrong');

  /**Reset on mount*/
  useEffect(() => {
    // Call the reset endpoint when component mounts
    fetch('https://vibes-backend-b15m.onrender.com/reset', {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          console.log('Reset endpoint called successfully');
        } else {
          console.error('Failed to call reset endpoint');
        }
      })
      .catch(error => {
        console.error('Error calling reset endpoint:', error);
      });
  }, []);


  const handleCharacterChange = (characterId: string) => {
    
    // first set the new character
    setActiveCharacter(characterId);

    // clear the chat stream
    clearChatStream();

    // ask the character to introduce themselves
    privateSend(characterId, `I'm interested in ${character_info.characters[characterId].description}. Please introduce yourself and begin a conversation with me about my career ideas. Make sure the message is short and concise.`);
  };


  
  return (
    <div className={styles.chatWindow}>
      <ChatRoomHeader />

      <div className={styles.chatRoomContent}>

        {/* Control Area - Left Side */}
        <div className={styles.controlArea}>

          <div className={styles.controlPanel1}>
            <ExpansiblePanel title="Career Profile">
              <CareerProfile
                  profileData={careerProfile}
                />
            </ExpansiblePanel>
          </div>

          <div className={styles.controlPanel2}>
            <ExpansiblePanel title="Your Top Ranked Careers">
              <CareerRank data={careerRecommendations || null} characterSetter={handleCharacterChange}/>
            </ExpansiblePanel>
          </div>
        </div>

        {/* Character Area - Center */}
        <div className={styles.characterArea}>
          <Character character_id={activeCharacter} />
        </div>

        {/* Chat Area - Right Side */}
        <div className={styles.chatArea}>
          <div className={styles.chatStream}>
            <ChatStream chats={chatStream} />
          </div>

          {/* Chat Input Container */}
          <div className={styles.chatBoxContainer}>
            <ChatBox onSendMessage={(message) => addMessage(message, 'user', activeCharacter, updateCareers)} />
          </div>
        </div>
      </div>

      {/* Background */}
      
      <div className={styles.bgOverlay} style={{ backgroundColor: character_info.characters[activeCharacter].color }}></div>
      <img src={bgImage} alt="background" className={styles.bgImage} />
    </div>
  );
};

export default ChatWindow;