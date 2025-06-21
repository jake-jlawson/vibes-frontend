import { useState } from "react";
import type { CareerProfile } from "./types";
import type { CareerRecommendations } from "./types";


const useCareers = () => {
    const [careerProfile, setCareerProfile] = useState<CareerProfile | null>(null);
    const [careerRecommendations, setCareerRecommendations] = useState<CareerRecommendations | null>(null);

    const updateCareers = async () => {
        await Promise.all([
            careerRecommendationsUpdate(),
            careerProfileUpdate()
        ]);
    }

    /**
     * @function careerProfileUpdate
     * @description Updates the career profile
     * @returns {void}
     */
    const careerProfileUpdate = async () => {
        const url = 'https://vibes-backend-b15m.onrender.com/profile';

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCareerProfile(data);
        } catch (error) {
            console.error('Error fetching career profile:', error);
        }
    }


    /**
     * @function careerRecommendationsUpdate
     * @description Updates the career recommendations
     * @returns {void}
     */
    const careerRecommendationsUpdate = async () => {
        const url = 'https://vibes-backend-b15m.onrender.com/recommendations';

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCareerRecommendations(data);
        } catch (error) {
            console.error('Error fetching career recommendations:', error);
        }
    }

    return { careerProfile, careerRecommendations, updateCareers };
}

export default useCareers;