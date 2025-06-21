import type { Message } from "../types";

export const chatStreamDummyData: Message[] = [
    {
        id: 1,
        content: "Hello! It's great to meet you. I'm excited to help you explore your strengths and passions to find careers that could be a good fit for you.\n\n To kick things off, could you tell me a little about yourself? For example, what are some of your interests or things you enjoy doing?",
        sender: "character",
        character: "mentor",
        timestamp: new Date(),
    },
]