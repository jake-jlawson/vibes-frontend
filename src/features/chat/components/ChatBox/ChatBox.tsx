import React, { useState, useRef } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';
import styles from './ChatBox.module.css';
import microphoneIcon from '../../../../assets/icons/microphone.png';

interface ChatBoxProps {
  onSendMessage: (message: string) => void;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  onSendMessage,
  onStartRecording,
  onStopRecording,
  disabled = false,
  placeholder = "Chat..."
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextAreaHeight = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = `${Math.min(textArea.scrollHeight, 120)}px`;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextAreaHeight();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
      // Reset textarea height
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
      }
    }
  };

  const handleMicrophoneClick = () => {
    if (isRecording) {
      setIsRecording(false);
      onStopRecording?.();
    } else {
      setIsRecording(true);
      onStartRecording?.();
    }
  };

  return (
    <div className={styles.chatBox}>
      <div className={styles.microphoneContainer}>
        <button
          className={styles.microphoneButton}
          onClick={handleMicrophoneClick}
          disabled={disabled}
          title={isRecording ? "Stop recording" : "Start voice recording"}
          type="button"
        >
          <img
            src={microphoneIcon}
            alt="Microphone"
            className={styles.microphoneIcon}
          />
        </button>
      </div>
      
      <div className={styles.inputContainer}>
        <textarea
          ref={textAreaRef}
          className={styles.textArea}
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
        />
      </div>
    </div>
  );
}; 