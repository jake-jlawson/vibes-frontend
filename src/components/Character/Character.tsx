import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Character.module.css';
import characterImage from '../../assets/characters/einstein.png';

interface CharacterProps {
  character_id?: string;
}

// Animation variants for character transitions
const characterVariants = {
  enter: {
    x: '100vw',
    opacity: 0
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
      duration: 0.6
    }
  },
  exit: {
    x: '-100vw',
    opacity: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
      duration: 0.5
    }
  }
};

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
        <AnimatePresence mode="wait">
          <motion.img
            key={character_id || 'default'}
            src={currentImage}
            alt="Career Counselor Character"
            className={styles.characterImage}
            variants={characterVariants}
            initial="enter"
            animate="center"
            exit="exit"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Character; 