
import { useState } from "react";

// Type imports
import type { Message } from "./types";
import { chatStreamDummyData as initialChatStream } from "./data/dummyData";



const useChat = () => {

    /**STATES*/
    const [chatStream, setChatStream] = useState<Message[]>(initialChatStream);

    /**
     * @function addMessage
     * @description Adds a new message to the chat stream
     * @param {string} content - The content of the message
     * @param {'user' | 'character'} sender - The sender of the message
     * @returns {void}
     */
    const addMessage = (content: string, sender: 'user' | 'character') => {
        const newMessage: Message = {
          id: Date.now(),
          content,
          sender,
          timestamp: new Date(),
        };
        setChatStream(prev => [...prev, newMessage]);
    };
    
    return { 
        chatStream,
        addMessage,
     };
}

export default useChat;
