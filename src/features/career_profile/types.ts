
/**
 * Career Profile Types
 */
export interface CareerProfile {
    name: string;
    bio: string | null;
    personality_scores: PersonalityScores;
    personality_descriptions: PersonalityDescriptions;
    recent_evidence: RecentEvidence;
    messages_analyzed: number;
}

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

interface RecentEvidence {
    energy_social_drive: string[];
    information_style: string[];
    decision_lens: string[];
    structure_preference: string[];
    emotional_stability: string[];
    risk_ambition: string[];
    cooperation_style: string[];
    focus_lens: string[];
    pace_decisiveness: string[];
    control_autonomy: string[];
}


/**
 * Career Recommendations
 */
export interface CareerRecommendations {
    recommended_characters: Character[];
}

interface Character {
    character_id: string;
    character_name: string;
    character_description: string;
    reasoning: string;
}

