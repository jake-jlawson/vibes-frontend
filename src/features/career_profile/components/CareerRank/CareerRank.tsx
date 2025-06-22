import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CareerRank.module.css';

import type { CareerRecommendations } from '../../types';
import Avatar from '../../../../assets/character_profiles/einstein.png';
import NoDataMessage from '../../../../components/NoDataMessage';

interface CareerRankProps {
  data: CareerRecommendations | null;
  characterSetter: (characterId: string) => void;
}

interface CareerRankRowProps {
  characterName: string;
  characterDescription: string;
  characterId: string;
  characterSetter: (characterId: string) => void;
}

// Animation variants for list items
const itemVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
      duration: 0.4
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
      duration: 0.3
    }
  }
};

const CareerRankRow: React.FC<CareerRankRowProps> = ({ 
  characterName, 
  characterDescription, 
  characterId,
  characterSetter
}) => {
  const [profileImage, setProfileImage] = useState<string>(Avatar);
  
  useEffect(() => {
    // Dynamically import character profile image
    import(`../../../../assets/character_profiles/${characterId}.png`)
      .then((module) => setProfileImage(module.default))
      .catch(() => setProfileImage(Avatar)); // Fallback to default
  }, [characterId]);
  
  return (
    <motion.div 
      className={styles.careerRankRow}
      layoutId={characterId}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      transition={{
        layout: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.6
        }
      }}
      onClick={() => characterSetter(characterId)}
    >
      <div className={styles.avatarContainer}>
        <div className={styles.avatarWrapper}>
          <img 
            src={profileImage} 
            alt={characterName}
            className={styles.avatar}
          />
          <motion.div 
            className={styles.chatBadge} 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className={styles.chatText}>Chat</span>
          </motion.div>
        </div>
      </div>
      <div className={styles.characterInfo}>
        <div className={styles.characterDescription}>
          {characterDescription}
        </div>
        <div className={styles.characterName}>
          {characterName}
        </div>
      </div>
    </motion.div>
  );
};

const CareerRank: React.FC<CareerRankProps> = ({ data, characterSetter }) => {
  if (!data || !data.recommended_characters || data.recommended_characters.length === 0) {
    return <NoDataMessage message="No career ranks available yet. Keep chatting!" />;
  }

  return (
    <div className={styles.careerRankContainer}>
      <AnimatePresence mode="popLayout">
        {data.recommended_characters.map((character) => (
          <CareerRankRow
            key={character.character_id}
            characterName={character.character_name}
            characterDescription={character.character_description}
            characterId={character.character_id}
            characterSetter={characterSetter}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CareerRank;
