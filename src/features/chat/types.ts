
/**
 * Chat Stream Types
 * Types and interfaces for chat functionality with the AI characters
 */

export interface Message {
    id: number;
    content: string;
    sender: 'user' | 'character';
    timestamp: Date;
    character?: string;
}
