// CareerProfile.tsx
import React from 'react';
import styles from './CareerProfile.module.css';
import NoDataMessage from '../../../../components/NoDataMessage';

interface PersonalityScores {
    energy_social_drive: number;
    information_style: number;
    decision_lens: number;
    structure_preference: number;
    emotional_stability: number;
    risk_ambition: number;
    cooperation_style: number;
    focus_lens: number;
    pace_decisiveness: number;
    control_autonomy: number;
}

interface PersonalityDescriptions {
    energy_social_drive: string;
    information_style: string;
    decision_lens: string;
    structure_preference: string;
    emotional_stability: string;
    risk_ambition: string;
    cooperation_style: string;
    focus_lens: string;
    pace_decisiveness: string;
    control_autonomy: string;
}

interface ProfileData {
    name: string | null;
    bio: string | null;
    personality_scores: PersonalityScores;
    personality_descriptions: PersonalityDescriptions;
    recent_evidence: Record<string, any>;
    messages_analyzed: number;
}

interface CareerProfileProps {
    profileData?: ProfileData | null;
    loading?: boolean;
    error?: string | null;
}

const CareerProfile: React.FC<CareerProfileProps> = ({
    profileData = null,
    loading = false,
    error = null
}) => {
    const formatTraitName = (key: string): string => {
        return key
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const getScoreColor = (score: number): string => {
        if (score <= 3) return styles.lowScore;
        if (score <= 7) return styles.mediumScore;
        return styles.highScore;
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading career profile...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>Error: {error}</div>
            </div>
        );
    }

    if (!profileData) {
        return <NoDataMessage message="No profile data available yet. Keep chatting!" />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Career Profile</h2>
                <p className={styles.subtitle}>Personality Assessment Overview</p>
            </div>

            <div className={styles.personalitySection}>
                <h3 className={styles.sectionTitle}>Personality Scores</h3>
                <div className={styles.scoresGrid}>
                    {Object.entries(profileData.personality_scores).map(([trait, score]) => (
                        <div key={trait} className={styles.scoreCard}>
                            <div className={styles.traitHeader}>
                                <h4 className={styles.traitName}>{formatTraitName(trait)}</h4>
                                <span className={`${styles.scoreValue} ${getScoreColor(score)}`}>
                                    {score}/10
                                </span>
                            </div>
                            <div className={styles.scoreBar}>
                                <div
                                    className={`${styles.scoreProgress} ${getScoreColor(score)}`}
                                    style={{ width: `${(score / 10) * 100}%` }}
                                />
                            </div>
                            <p className={styles.traitDescription}>
                                {profileData.personality_descriptions[trait as keyof PersonalityDescriptions]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.footer}>
                <p className={styles.analysisInfo}>
                    Based on {profileData.messages_analyzed} messages analyzed
                </p>
            </div>
        </div>
    );
};

export default CareerProfile;