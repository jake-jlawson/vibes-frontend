import React, { useEffect, useState } from 'react';
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
    <div className={styles.careerRankRow}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarWrapper}>
          <img 
            src={profileImage} 
            alt={characterName}
            className={styles.avatar}
          />
          <div className={styles.chatBadge} onClick={() => characterSetter(characterId)}>
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

const CareerRank: React.FC<CareerRankProps> = ({ data, characterSetter }) => {
  if (!data || !data.recommended_characters || data.recommended_characters.length === 0) {
    return <NoDataMessage message="No career ranks available yet. Keep chatting!" />;
  }

  return (
    <div className={styles.careerRankContainer}>
      {data.recommended_characters.map((character) => (
        <CareerRankRow
          key={character.character_id}
          characterName={character.character_name}
          characterDescription={character.character_description}
          characterId={character.character_id}
          characterSetter={characterSetter}
        />
      ))}
    </div>
  );
};

export default CareerRank;
