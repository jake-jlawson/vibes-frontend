import React, { useState, useEffect } from 'react';
import styles from './Character.module.css';
import characterImage from '../../assets/characters/einstein.png';

interface CharacterProps {
  character_id?: string;
}

const Character: React.FC<CharacterProps> = ({ character_id }) => {
  const [currentImage, setCurrentImage] = useState<string>(characterImage);

  useEffect(() => {
    if (character_id) {
      // Dynamically import the character image when needed
      import(`../../assets/characters/${character_id}.png`)
        .then((module) => setCurrentImage(module.default))
        .catch(() => setCurrentImage(characterImage)); // Fallback to default
    } else {
      setCurrentImage(characterImage);
    }
  }, [character_id]);

  return (
    <div className={styles.character}>
      <div className={styles.characterContainer}>
        <img 
          src={currentImage} 
          alt="Career Counselor Character" 
          className={styles.characterImage}
        />
      </div>
    </div>
  );
};

export default Character; 