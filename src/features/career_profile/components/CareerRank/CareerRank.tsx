import React from 'react';
import styles from './CareerRank.module.css';

import type { CareerRecommendations } from '../../types';
import Avatar from '../../../../assets/character_profiles/einstein.png';

interface CareerRankProps {
  data: CareerRecommendations | null;
}

interface CareerRankRowProps {
  characterName: string;
  characterDescription: string;
  avatarUrl?: string;
}

const CareerRankRow: React.FC<CareerRankRowProps> = ({ 
  characterName, 
  characterDescription, 
  avatarUrl = Avatar
}) => {
  return (
    <div className={styles.careerRankRow}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarWrapper}>
          <img 
            src={avatarUrl} 
            alt={characterName}
            className={styles.avatar}
          />
          <div className={styles.chatBadge}>
            <span className={styles.chatText}>Chat</span>
          </div>
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
    </div>
  );
};

const CareerRank: React.FC<CareerRankProps> = ({ data }) => {
  return (
    <div className={styles.careerRankContainer}>
      {data?.recommended_characters.map((character) => (
        <CareerRankRow
          key={character.character_id}
          characterName={character.character_name}
          characterDescription={character.character_description}
        />
      ))}
    </div>
  );
};

export default CareerRank;
