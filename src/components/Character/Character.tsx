import React from 'react';
import styles from './Character.module.css';
import characterImage from '../../assets/Character.png';

const Character: React.FC = () => {
  return (
    <div className={styles.character}>
      <div className={styles.characterContainer}>
        <img 
          src={characterImage} 
          alt="Career Counselor Character" 
          className={styles.characterImage}
        />
      </div>
    </div>
  );
};

export default Character; 