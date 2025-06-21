
import { useState } from "react";

// Type imports
import type { Message } from "./types";
import { chatStreamDummyData as initialChatStream } from "./data/initMessageData";



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
    const addMessage = (content: string, sender: 'user' | 'character', character: string, callback: () => void) => {
        const newMessage: Message = {
          id: Date.now(),
          content,
          sender,
          timestamp: new Date(),
        };
        setChatStream(prev => [...prev, newMessage]);

        // send message to the server and recieve response
        sendChatMessage(character, content).then(response => {
          const newMessage: Message = {
                id: Date.now(),
                content: response.message || '',
                sender: 'character',
                timestamp: new Date(),
            };
            setChatStream(prev => [...prev, newMessage]);
            callback();
        });
    };


    /**
     * @function sendMessageToServer
     * @description Sends a message to the server and recieves a response
     * @param {string} message - The message to send
     * @returns {Promise<string>} - The response from the server
     */
    interface ChatRequest {
      character: string;
      message: string;
    }
    
    interface ChatResponse {
      // Define the expected response structure based on your API
      // You'll need to update this based on what your API actually returns
      response?: string;
      [key: string]: any; // Allow for additional properties
    }
    
    const sendChatMessage = async (
      character: string, 
      message: string
    ): Promise<ChatResponse> => {
      const url = 'https://vibes-backend-b15m.onrender.com/chat';
      
      const requestBody: ChatRequest = {
        character,
        message
      };
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data: ChatResponse = await response.json();
        return data;
      } catch (error) {
        console.error('Error sending chat message:', error);
        throw error;
      }
    };
    
    
    
    return { 
        chatStream,
        addMessage,
     };
}

export default useChat;
