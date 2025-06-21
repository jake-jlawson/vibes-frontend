import type { Message } from "../types";

export const chatStreamDummyData: Message[] = [
    {
        id: 1,
        content: `Hello! It's great to meet you. 
        
        I'm here to help you explore your strengths, passions, and what truly matters to you, so we can discover career paths that feel like a natural fit.
        
        Let's start simple: Can you tell me a little bit about yourself? For example: What are some things you enjoy doing? What topics or activities naturally grab your attention?`,
        sender: "character",
        character: "mentor",
        timestamp: new Date(),
    },
]