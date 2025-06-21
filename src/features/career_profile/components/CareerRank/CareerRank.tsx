import React from 'react';
import styles from './CareerRank.module.css';

import type { CareerRecommendations } from '../../types';

interface CareerRankProps {
  data: CareerRecommendations | null;
}

const CareerRank: React.FC<CareerRankProps> = ({ data }) => {
  return (
    <div className={styles.careerRankContainer}>
        {data?.recommended_characters.map((character) => (
            <div key={character.character_id}>
                <h3>{character.character_name}</h3>
            </div>
        ))}
    </div>
  );
};

export default CareerRank;
