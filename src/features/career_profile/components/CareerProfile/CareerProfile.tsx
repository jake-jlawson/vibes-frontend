// CareerProfile.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Animation variants for score cards
const scoreCardVariants = {
    hidden: {
        opacity: 0,
        y: -10,
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
        y: -10,
        scale: 0.95,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 24,
            duration: 0.3
        }
    }
};

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

    // Sort personality scores from highest to lowest
    const getSortedScores = () => {
        if (!profileData?.personality_scores) return [];
        
        return Object.entries(profileData.personality_scores)
            .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
            .map(([trait, score]) => ({
                trait,
                score,
                description: profileData.personality_descriptions[trait as keyof PersonalityDescriptions]
            }));
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

    const sortedScores = getSortedScores();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Career Profile</h2>
                <p className={styles.subtitle}>Personality Assessment Overview</p>
            </div>

            <div className={styles.personalitySection}>
                <h3 className={styles.sectionTitle}>Personality Scores</h3>
                <div className={styles.scoresGrid}>
                    <AnimatePresence mode="popLayout">
                        {sortedScores.map(({ trait, score, description }) => (
                            <motion.div 
                                key={trait}
                                layoutId={trait}
                                className={styles.scoreCard}
                                variants={scoreCardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                                transition={{
                                    layout: {
                                        type: "spring" as const,
                                        stiffness: 300,
                                        damping: 30,
                                        duration: 0.6
                                    }
                                }}
                            >
                                <div className={styles.traitHeader}>
                                    <h4 className={styles.traitName}>{formatTraitName(trait)}</h4>
                                    <motion.span 
                                        className={`${styles.scoreValue} ${getScoreColor(score)}`}
                                        key={`${trait}-${score}`}
                                        initial={{ scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {score}/10
                                    </motion.span>
                                </div>
                                <div className={styles.scoreBar}>
                                    <motion.div
                                        className={`${styles.scoreProgress} ${getScoreColor(score)}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(score / 10) * 100}%` }}
                                        transition={{
                                            duration: 0.8,
                                            ease: "easeInOut",
                                            delay: 0.1
                                        }}
                                    />
                                </div>
                                <p className={styles.traitDescription}>
                                    {description}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
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