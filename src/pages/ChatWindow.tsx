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
import CareerProfile from '../components/CareerProfile/CareerProfile';

// Hooks
import useChat from '../features/chat/useChat';
import useCareerProfile from '../features/career_profile/useCareers';

const ChatWindow: React.FC = () => {
  const { chatStream, addMessage } = useChat();
  const { careerProfile, careerRecommendations, updateCareers, loading, error } = useCareerProfile();
  const [activeCharacter, setActiveCharacter] = useState<string>('mentor');

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

  useEffect(() => {
    console.log("chat stream:", chatStream);
  }, [chatStream]);

  useEffect(() => {
    console.log("career profile:", careerProfile);
  }, [careerProfile]);

  useEffect(() => {
    console.log("career recommendations:", careerRecommendations);
  }, [careerRecommendations]);

  return (
    <div className={styles.chatWindow}>
      <ChatRoomHeader />

      <div className={styles.chatRoomContent}>

        {/* Control Area - Left Side */}
        <div className={styles.controlArea}>

          <div className={styles.controlPanel1}>
            <ExpansiblePanel title="Career Profile">
              <div className={styles.controlPanel1Content}>
                <CareerProfile
                  profileData={careerProfile}
                  loading={loading}
                  error={error}
                />
              </div>
            </ExpansiblePanel>
          </div>

          <div className={styles.controlPanel2}>
            <ExpansiblePanel title="Top Ranked Careers">
                <div className={styles.controlPanelContent}>
                  <CareerRank data={careerRecommendations || null} />
                </div>
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
            <ChatBox onSendMessage={(message) => addMessage(message, 'user', activeCharacter, updateCareers)} />
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